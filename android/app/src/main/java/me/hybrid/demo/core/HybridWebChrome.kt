package me.hybrid.demo.core

import android.content.Context
import android.content.Intent
import android.util.Log
import android.webkit.JsPromptResult
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.widget.Toast
import me.hybrid.demo.config.HybridConfig
import me.hybrid.demo.ui.ExampleActivity
import me.hybrid.demo.ui.WebViewActivity
import org.json.JSONObject

class HybridWebChrome(private val webView: WebView, private val context: Context) :
    WebChromeClient() {

    var count = 1

    override fun onJsPrompt(
        view: WebView?,
        url: String?,
        message: String?,
        defaultValue: String?,
        result: JsPromptResult?
    ): Boolean {
        Log.d("allen", "url:$url\nmessage:$message")
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
        if (message.isNullOrEmpty()) {
            result?.confirm()
        } else {
            val request = JSONObject(message)
            dispatchMessage(request, result)
        }
        return true
    }

    private fun dispatchMessage(
        request: JSONObject,
        result: JsPromptResult?
    ) {
        val name = request.optString("name")
        if (name.isNullOrEmpty()) {
            result?.confirm()
            return
        }
        val params = request.optJSONObject("params")
        when (name) {
            HybridConfig.NAME_JUMP -> {
                val url = params?.optString("url")
                val resultJson = JSONObject()
                when (url) {
                    "/example" -> {
                        context.startActivity(Intent(context, ExampleActivity::class.java))
                        resultJson.put("code", 0)
                        resultJson.put("msg", "success")
                    }
                    else -> {
                        resultJson.put("code", -1)
                        resultJson.put("msg", "activity not found ")
                    }
                }
                result?.confirm(resultJson.toString())
            }
            HybridConfig.NAME_FUNC -> {
                val resultJson = JSONObject()
                resultJson.put("data", "回调处理:${count++}")
                resultJson.put("code", 0)
                resultJson.put("msg", "success")

                val cb = request.optString("callback")
                val cbId = request.optString("callbackId")
                if (!cb.isNullOrEmpty() && !cbId.isNullOrEmpty()) {
                    webView.evaluateJavascript("$cb('$cbId','$resultJson')", null)
                }
                result?.confirm(resultJson.toString())
            }
            HybridConfig.NAME_EVENT -> {
                val title = params?.optString("title")
                (context as WebViewActivity?)?.updateTitle(title)
                result?.confirm("event")
            }
            else -> result?.confirm()
        }
    }
}