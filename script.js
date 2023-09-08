$(document).ready(function () {









    //MobileOTPTimer();
    //$(".aPersonalInfo").hide();
    //$(".aPersonalInfoInactive").show(); 
    $("#dvMobileOTP").hide();
    $(".dvOTPSuccessMessage").hide();
    
    $(".aPersonalInfo").click(function () {
        var OTP = '' + $("#inptMobileOTP1").val() + $("#inptMobileOTP2").val() + $("#inptMobileOTP3").val() + $("#inptMobileOTP4").val();
        var EnterMobile = $("#inptPhone").val();
        var mobileReg = /^[1-9][0-9]{9}$/;
        if (EnterMobile === null || EnterMobile === undefined || EnterMobile === "") {
            swal.fire("", "Please fill in your number")
            return;
        }
        if (!mobileReg.test(EnterMobile)) {
            swal.fire("", "Please insert valid number")
            return;
        }

        if (OTP === "" || OTP === null || OTP === undefined) {
            swal.fire("", "Please enter your OTP");
            return;
        }
        if (OTP.length == 4) {
            VerifyOTP(EnterMobile, OTP);
            //if ($("#hdnIsMobileVerified").val() == "Y") {
            //    setTimeout(function () {
            //        $(function () {
            //            SaveOreoQR();
            //        });
            //    }, 200);
            //    //var IsOther = $("#hdnOtherJourney").val();
            //    //if (IsOther === "Y") {
            //    //    SaveOtherJourney();
            //    //}
            //    //else {
            //    //    SaveOreoQR();
            //    //}
            //}
            //else {
            //    //
            //}
        }
        else {
            swal.fire("", "Please enter valid OTP");
            return;
        }




    });
    $("#inptPhone").change(function () {
        var mobileReg = /^[1-9][0-9]{9}$/;
        var Mobile = $("#inptPhone").val();
        if (Mobile === null || Mobile === undefined || Mobile === "") {
            swal.fire("", "Please fill in the required field.")
            return;
        }
        if (!mobileReg.test(Mobile)) {
            swal.fire("", "Please insert valid Mobile")
            return;
        }
        $(".aMobileOTPDone").hide();
        $(".aMobileOTPTimer").show();
        $(".aMobileOTPReSend").hide();
        $("#dvMobileOTP").show();
        $(".dvOTPSuccessMessage").show();
        CreateOTP($("#inptPhone").val());
        MobileOTPTimer(30);
        try {
            dataLayer.push({
                event: 'CTA',
                buttonName: "OTP - Response Generated",
                pageName: "personalinfo"
            });
        }
        catch
        {

        }
    });
    $(".aMobileOTPReSend a").click(function () {
        $(".aMobileOTPTimer").show();
        $(".aMobileOTPReSend").hide();
        CreateOTP($("#inptPhone").val());
        MobileOTPTimer(30);
        $("#inptMobileOTP1").val("");
        $("#inptMobileOTP2").val("");
        $("#inptMobileOTP3").val("");
        $("#inptMobileOTP4").val("");
        try {
            dataLayer.push({
                event: 'CTA',
                buttonName: "Mobile OTP Verification-Resend",
                pageName: "personalinfo"
            });
        }
        catch
        {

        }
    });
    $(".aVirifyOTP").click(function () {
        var OTP = '' + $("#inptMobileOTP1").val() + $("#inptMobileOTP2").val() + $("#inptMobileOTP3").val() + $("#inptMobileOTP4").val();
        var EnterMobile = $("#inptPhone").val();
        VerifyOTP(EnterMobile, OTP);

    });
});

function SaveOreoQR() {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var nameReg = /^[a-zA-Z ]+$/;
    var mobileReg = /^[1-9][0-9]{9}$/;
    var name = $("#inptName").val();
    var Mobile = $("#inptPhone").val();
    var Email = $("#inptEmail").val();
    var IsWhatsAppEmail = "N";
    var IsMobileVerfied = $("#hdnIsMobileVerified").val();
    //var IsWhatsApp = "N";
    //var IsSendEmail = "N";

    //var IsCheckWhatsApp = $("#inptIsWhatsApp").prop('checked');
    //var IsCheckEmail = $("#inptIsEmail").prop('checked');
    var IsCheckWhatsAppEmail = $("#inptIsWhatsAppEmail").prop('checked');
    //var IsTermsConditionPrivacyPolicy = $("#inptTermsConditionPrivacyPolicy").prop('checked');
    var IsTermsCondition = $("#inptTermsCondition").prop('checked');
    var IsPrivacyPolicy = $("#inptPrivacyPolicy").prop('checked');

    name = name.trim();
    var vCookies = getCookie("_ga");

    if (name === null || name === undefined || name === "") {
        swal.fire("", "Please fill in your name")
        return;
    }
    if (name.Length > 2) {
        swal.fire("", "Please enter valid name")
        return;
    }
    if (!nameReg.test(name)) {
        swal.fire("", "Please insert valid name")
        return;
    }

    if (Mobile === null || Mobile === undefined || Mobile === "") {
        swal.fire("", "Please fill in your number")
        return;
    }
    if (!mobileReg.test(Mobile)) {
        swal.fire("", "Please insert valid number")
        return;
    }


    //Verify Logic here

    //if (OTP)

    if (IsMobileVerfied === "N" || IsMobileVerfied === undefined || IsMobileVerfied === null || IsMobileVerfied === "") {
        swal.fire("", "Please verify the OTP")
        return;
    }
    if (Email === null || Email === undefined || Email === "") {
        swal.fire("", "Please fill in your Email ID")
        return;
    }
    if (!emailReg.test(Email)) {
        swal.fire("", "Please insert valid Email ID")
        return;
    }

    //if (IsTermsConditionPrivacyPolicy === false || IsTermsConditionPrivacyPolicy === undefined) {
    //    swal.fire("", "Please check Terms & Condition and Privacy policy");
    //    return;
    //}
    if (IsCheckWhatsAppEmail === false) {
        swal.fire("", "Please confirm how you would like to receive the response");
        return;
    }
    if (IsTermsCondition === false || IsTermsCondition === undefined) {
        swal.fire("", "Please accept our T&C");
        return;
    }
    if (IsPrivacyPolicy === false || IsPrivacyPolicy === undefined) {
        swal.fire("", "Please accept Privacy policy");
        return;
    }


    //if (IsCheckWhatsApp === false && IsCheckEmail === false) {
    //    swal.fire("","Please check atleast one check box.");
    //    return;
    //}


    //if ($("#inptIsWhatsApp").prop('checked') == true) {
    //    IsWhatsApp = "Y"
    //}
    //if ($("#inptIsEmail").prop('checked') == true) {
    //    IsSendEmail = "Y"
    //}

    if ($("#inptIsWhatsAppEmail").prop('checked') == true) {
        IsWhatsAppEmail = "Y"
    }
    $("#dvLoaderForThread").show();
    var fileData = new FormData();
    fileData.append("RowId", $("#hdnRowId").val());
    fileData.append("Name", name);
    fileData.append("MobileNumber", Mobile);
    fileData.append("EmailId", Email);
    //fileData.append("IsSendMessageWhatsApp", IsWhatsApp);
    //fileData.append("IsSendMessageEmail", IsSendEmail);
    fileData.append("IsSendMessageWhatsAppEmail", IsWhatsAppEmail);
    fileData.append("IsMobileVerfied", IsMobileVerfied);
    fileData.append("GACode", vCookies);
    $.ajax({
        url: '/Oreo/UpdatePersonalInfo',
        type: "POST",
        contentType: false,
        processData: false,
        data: fileData,
        success: function (response) {
            if (response.status == "200") {

                dataLayer.push({
                    event: 'CTA',
                    buttonName: 'Submit PII-Next',
                    pageName: 'personalinfo',
                });

                fbq('trackCustom', 'Oreo_SIWO_SubmitPII');
                gtag('event', 'conversion', { 'send_to': 'AW-438901253/eVM2CPz7vbkYEIW0pNEB' });

                try {
                    jstag.send({
                        "email": Email,
                    });
                }
                catch
                {

                }

                setTimeout(function () {
                    $(function () {
                        //window.location.href = "/oreo/thankyou?rdr=" + response.encryption;
                        window.location.href = response.encryption;
                    });
                }, 100);

            }
            else {
                swal.fire("", response.message);
                $("#dvLoaderForThread").hide()
            }
        },
        error: function (err) {

            swal.fire("", err.statusText);
            $("#dvLoaderForThread").hide()
        }
    });
}
function SaveOtherJourney() {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var nameReg = /^[a-zA-Z ]+$/;
    var mobileReg = /^[1-9][0-9]{9}$/;
    var name = $("#inptName").val();
    var Mobile = $("#inptPhone").val();
    var Email = $("#inptEmail").val();
    var IsMobileVerfied = $("#hdnIsMobileVerified").val();

    if (name === null || name === undefined || name === "") {
        swal.fire("", "Please fill in the required field.")
        return;
    }
    if (!nameReg.test(name)) {
        swal.fire("", "Please insert valid Name")
        return;
    }
    if (Mobile === null || Mobile === undefined || Mobile === "") {
        swal.fire("", "Please fill in the required field.")
        return;
    }
    if (!mobileReg.test(Mobile)) {
        swal.fire("", "Please insert valid Mobile")
        return;
    }
    if (IsMobileVerfied === "N" || IsMobileVerfied === undefined || IsMobileVerfied === null || IsMobileVerfied === "") {
        swal.fire("", "Please verify the OTP")
        return;
    }
    if (Email === null || Email === undefined || Email === "") {
        swal.fire("", "Please fill in the required field.")
        return;
    }
    if (!emailReg.test(Email)) {
        swal.fire("", "Please insert valid EmailId")
        return;
    }

    var fileData = new FormData();
    fileData.append("RowId", $("#hdnRowId").val());
    fileData.append("Name", name);
    fileData.append("MobileNumber", Mobile);
    fileData.append("EmailId", Email);
    fileData.append("IsSendMessageWhatsApp", "N");
    fileData.append("IsSendMessageEmail", "N");
    $.ajax({
        url: '/Oreo/UpdatePersonalInfoOtherJourney',
        type: "POST",
        contentType: false,
        processData: false,
        data: fileData,
        success: function (response) {
            if (response.status == "200") {
                window.location.href = "/oreo/thankyou?rdr=" + response.encryption;
            }
            else {
                swal.fire("", response.message);
            }
        },
        error: function (err) {
            swal.fire("", err.statusText);
        }
    });
}
function isNumber(e) {

    e = e || window.event;
    var charCode = e.which ? e.which : e.keyCode;
    return /\d/.test(String.fromCharCode(charCode));
}
//function MobileOTPTimer() {
//    var timer2 = "0:31";
//    $('.countdown').html("");
//    clearTimeout(interval);
//    var interval = setInterval(function () {
//        var timer = timer2.split(':');
//        //by parsing integer, I avoid all extra string processing
//        var minutes = parseInt(timer[0], 10);
//        var seconds = parseInt(timer[1], 10);
//        --seconds;
//        minutes = (seconds < 0) ? --minutes : minutes;
//        seconds = (seconds < 0) ? 59 : seconds;
//        seconds = (seconds < 10) ? '0' + seconds : seconds;
//        //minutes = (minutes < 10) ?  minutes : minutes;
//        $('.countdown').html(minutes + ':' + seconds);
//        if (minutes < 0) clearInterval(interval);
//        //check if both minutes and seconds are 0
//        if ((seconds <= 0) && (minutes <= 0)) clearInterval(interval);
//        timer2 = minutes + ':' + seconds;
//        if (timer2 === "0:00") {
//            $(".aMobileOTPTimer").hide();
//            $(".aMobileOTPReSend").show();
//        }
//    }, 1000);
//}
function CreateOTP(mobile) {
    var fileData = new FormData();
    fileData.append("MobileNo", mobile);
    $.ajax({
        url: '/Oreo/Create_OTP',
        type: "POST",
        contentType: false,
        processData: false,
        data: fileData,
        success: function (response) {
            $("#inptMobileOTP1").val(response.charAt(0));
            $("#inptMobileOTP2").val(response.charAt(1));
            $("#inptMobileOTP3").val(response.charAt(2));
            $("#inptMobileOTP4").val(response.charAt(3));
            //swal.fire("","OTP Send at your mobile no. for verification");
            //$("#inptPhone").focus();
            //swal.fire("", "You will receive an OTP on your number");
            
            $(".dvOTPSuccessMessage").show();
        },
        error: function (err) {
            swal.fire("", err.statusText);
        }
    });
}
function VerifyOTP(mobile, OTP) {
    var fileData = new FormData();
    fileData.append("MobileNo", mobile);
    fileData.append("OTP", OTP);
    $.ajax({
        url: '/Oreo/VerifyOTP',
        type: "POST",
        contentType: false,
        processData: false,
        data: fileData,
        success: function (response) {
            if (response === "Y") {
                $(".aMobileOTPDone").show();
                $(".aMobileOTPTimer").hide();
                $(".aMobileOTPReSend").hide();
                $("#dvMobileOTP").hide();
                $(".dvOTPSuccessMessage").hide();
                //$(".aPersonalInfo").show();
                //$(".aPersonalInfoInactive").hide(); 
                $("#hdnIsMobileVerified").val("Y");
                $("#inptPhone").attr("disabled", "disabled");

                try {
                    dataLayer.push({
                        event: 'CTA',
                        buttonName: 'Mobile OTP Verified',
                        pageName: 'personalinfo',
                    });

                }
                catch { }
                SaveOreoQR();
            }
            else {
                $("#hdnIsMobileVerified").val("N");
                $("#inptPhone").removeAttr("disabled");
                swal.fire("", "Please enter valid OTP");

            }
        },
        error: function (err) {
            swal.fire("", err.statusText);
        }
    });
}

let timerOn = true;
let timeInterval;
function MobileOTPTimer(remaining) {

    var m = Math.floor(remaining / 60);
    var s = remaining % 60;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.querySelector('.countdown').innerHTML = m + ':' + s;
    remaining -= 1;
    clearTimeout(timeInterval);

    if (remaining === 0 || remaining === -1) {
        $(".aMobileOTPTimer").hide();
        $(".aMobileOTPReSend").show();
    }

    if (remaining >= 0 && timerOn) {
        timeInterval = setTimeout(function () {
            MobileOTPTimer(remaining);
        }, 1000);
        return;
    }

    if (!timerOn) {
        // Do validate stuff here
        return;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
