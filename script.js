$(document).ready(function () {
    /*
     * Main variables
     */
    var content = [{
        title: "Haii Ezzii!!",
        desc: ""
    },
    {
        title: "aku mau jujur sama kamu.",
        desc: "ada sesuatu yang pengin aku sampaikan. bukan buat membela diri atau mengubah apa yang kamu rasain, tapi karena ada hal yang seharusnya aku jelasin dengan jujur"
    },
    {
       title: "aku tau aku salah.",
       desc: "aku paham kenapa kamu kecewa setelah melihat chat itu. aku ngga akan mencari alasan untuk membenarkan apa yang aku lakukan. aku sadar tindakanku sudah membuat kamu mempertanyakan keseriusan aku, dan aku ngga bisa menyalahkan kamu atas itu."
    },
    {
        title:"ada hal yang belum sempat aku sampaikan.",
        desc:"jujur, awalnya aku memang belum sepenuhnya yakin. aku masih berusaha mengenal kamu dan memahami perasaan aku sendiri. tapi seiring berjalannya waktu, ada hal-hal dari kamu yang membuat aku mulai melihat kamu sebagai seseorang yang ingin aku perjuangkan."
    },
    {
        title: "ironisnya, justru saat itu...",
        desc: "malam sebelum kamu tau semuanya, aku datang karena aku mulai yakin sama kamu. tapi pagi harinya, kamu justru menemukan sesuatu yang bertolak belakang dengan apa yang sedang aku rasakan. aku sadar, dari sudut pandang kamu, ucapan aku mungkin sekarang terdengar sulit dipercaya."
    },
    {
        title: "kamu berhak mempertanyakan aku.",
        desc: "aku bisa menjelaskan apa yang aku rasakan, tapi aku ngga bisa meminta kamu mengabaikan apa yang sudah kamu lihat. aku ngerti kalau sekarang kamu mungkin bertanya-tanya kenapa aku datang ke kamu, sementara aku juga mencari hal yang sama dari orang lain. aku ngga punya pembenaran yang bisa menghapus kenyataan itu."
    }, {
        title: "aku ngga mau cuma berhenti di kata maaf.",
        desc:"aku tau kepercayaan ngga bisa dibangun kembali hanya dengan beberapa kalimat. kalau aku memang serius sama kamu, seharusnya itu terlihat dari bagaimana aku bersikap, menjaga batasan, dan bertanggung jawab atas pilihan aku sendiri. bukan cuma dari apa yang aku ucapkan saat keadaan sudah terlanjur seperti ini."
    },
    {
        title: "aku ngga meminta kamu langsung percaya.",
        desc: "aku cuma ingin kamu tau bahwa perasaan aku malam itu bukan sesuatu yang ingin aku jadikan alasan untuk menutupi kesalahan aku. aku memang salah, dan aku harus menerima konsekuensinya.|aku ngga tau setelah ini kamu akan memilih bagaimana. aku ngga mau memaksa kamu untuk bertahan atau memaafkan aku. kalau masih ada kesempatan, aku ingin membuktikan keseriusan aku lewat tindakan. kalau kamu butuh waktu, aku akan menghargainya."
    },
        {
        title: "maaf yaa, karena apa yang aku lakukan sudah melukai kamu.",
        desc: ""
    }
 ];
    var currentPage = 0;
    //generate content
    for (var i = 0; i < content.length; i++) {
        //split content letters to array
        for (var obj in content[i]) {
            //if string
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            //if array (grouped text)
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        //set text to
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
        //clone to data
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }
    //initial arrangement
    arrangeCurrentPage();
    scrambleOthers();
    /*
     * Event handlers
     */
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function () {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-next").click(function () {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    /*
     * Functions
     */
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {

            if (content[i].desc[j] === "|") {
                $(".soup-desc").last().append(
                    '<span class="letter paragraph-break">&nbsp;</span>'
                );
            } else {
                $(".soup-desc").last().append(
                    '<span class="letter">' + content[i].desc[j] + '</span>'
                );
            }

        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            //don't scramble currentPage
            if (currentPage === i)
                continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            //apply to .title h1s and .desc ps
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {
                    //define random position on screen
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    //defining boundaries
                    var offset = $(".position-data").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
                    //finally, apply all the scrambles
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#DDD",
                        zIndex: "initial"
                    });
                }
            }
        }
    }
});
