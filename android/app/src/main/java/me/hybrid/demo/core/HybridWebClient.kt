package me.hybrid.demo.core

import android.net.Uri
import android.util.Log
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import me.hybrid.demo.config.HybridConfig
import java.io.File
import java.io.FileInputStream
import java.io.IOException
import java.io.InputStream

class HybridWebClient : WebViewClient() {
    private val H5_HOST = "http://192.168.3.186"

    override fun shouldInterceptRequest(view: WebView, url: String): WebResourceResponse? {
        if (url.isEmpty() || !url.contains(H5_HOST)) return super.shouldInterceptRequest(view, url)
        val uri = Uri.parse(url)
        if (uri.path.isNullOrEmpty()) return super.shouldInterceptRequest(view, url)
        val file =
            File(view.context.filesDir.absolutePath.toString() + "/" + HybridConfig.LOCAL_HYBRID_PATH + uri.path)
        if (file.isFile && file.exists()) {
            var response: WebResourceResponse? = null
            try {
                val localCopy: InputStream = FileInputStream(file)
                val mimeType: String = getMimeType(url)
                response = WebResourceResponse(mimeType, "UTF-8", localCopy)
                Log.d("allen","local file cached. ${file.absolutePath}")
            } catch (e: IOException) {
                e.printStackTrace()
            }
            return response
        }
        return super.shouldInterceptRequest(view, url)
    }

    private fun getMimeType(url: String): String {
        return try {
            if (url.contains(".")) {
                val index = url.lastIndexOf(".")
                if (index > -1) {
                    val paramIndex = url.indexOf("?")
                    val type =
                        url.substring(index + 1, if (paramIndex == -1) url.length else paramIndex)
                    when (type) {
                        "js" -> return "text/javascript"
                        "css" -> return "text/css"
                        "html" -> return "text/html"
                        "png" -> return "image/png"
                        "jpg" -> return "image/jpg"
                        "gif" -> return "image/gif"
                        else -> {
                        }
                    }
                }
            }
            "text/plain"
        } catch (e: Exception) {
            e.printStackTrace()
            "text/plain"
        }
    }

}