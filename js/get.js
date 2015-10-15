(function ($) {

    var isInAMSStatic = location.href.search(/^http\:\/\/www\.tmall\.com\/wow/)>-1;
    if (!isInAMSStatic)
        return;

    $(function () {
        var interval = 800;
        var closeDelay = 200;
        var index = 0;
        var couponLinks;
        var getCoupon = function () {
            if (index >= couponLinks.length) {
                console.log("领取完毕");
                location = location.href;
            }
            var coponLink = couponLinks[index];
            coponLink.click();
            index++;
            console.log("领取 第" + index + " 张");
            setTimeout(getCoupon, interval);
            setTimeout(function () {
                var close = document.querySelector('.mui-dialog-close');
                if (close != null) close.click();
            }, closeDelay);
        };
        var _scrollTop = 0;
        var _scrollStep = document.documentElement.clientHeight;
        var _maxScrollTop = document.body.clientHeight - document.documentElement.clientHeight;
        var autoScrollDown = setInterval(function () {
            _scrollTop += _scrollStep;
            if (_scrollTop > _maxScrollTop) {
                clearInterval(autoScrollDown);
                couponLinks = document.querySelectorAll('.mui-act-item-yhqbtn');
                console.log("总共：" + couponLinks.length + "条张优惠券待领取...");
                getCoupon();
            } else {
                document.body.scrollTop = _scrollTop;
            }
        }, 500);
    });

})(Zepto);