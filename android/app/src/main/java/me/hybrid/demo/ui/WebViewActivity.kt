package me.hybrid.demo.ui

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Build
import android.os.Bundle
import android.webkit.CookieManager
import android.webkit.ValueCallback
import android.webkit.WebSettings
import android.webkit.WebView
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_web.*
import me.hybrid.demo.BuildConfig
import me.hybrid.demo.R
import me.hybrid.demo.core.HybridWebChrome
import me.hybrid.demo.core.HybridWebClient
import org.json.JSONObject

class WebViewActivity : Activity() {
    private val url by lazy { intent?.getStringExtra("url") }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_web)
        initView()
        webview.loadUrl(url)
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun initView() {
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)
        webview.webViewClient = HybridWebClient()
        webview.webChromeClient = HybridWebChrome(webview, this)

        val settings = webview.settings
        settings.javaScriptEnabled = true
        settings.databaseEnabled = true
        settings.setAppCacheEnabled(true)
        settings.domStorageEnabled = true
        settings.loadWithOverviewMode = false
        settings.useWideViewPort = false

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            //适配5.0以上不允许跨域设置cookie配置
            CookieManager.getInstance().setAcceptThirdPartyCookies(webview, true)
            //适配5.0以上不允许http和https混合使用情况
            settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }
    }

    override fun onPause() {
        val resultJson = JSONObject()
        resultJson.put("data", "回调处理")
        resultJson.put("code", 0)
        resultJson.put("msg", "success")
        webview.evaluateJavascript("eventDispatcher('pause','$resultJson')") {
            Toast.makeText(this, it, Toast.LENGTH_SHORT).show()
        }
        super.onPause()
    }

    override fun onBackPressed() {
        super.onBackPressed()
    }

    fun updateTitle(title: String?) {
        if (title.isNullOrEmpty()) return
        tv_title.text = title
    }

}