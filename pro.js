function getMeta(childSelector){
    return $("meta" + childSelector)[0].attributes.content.textContent
}
function getQMeta(){
    return quotewindow.data[$("quotestrap")[0].getAttribute("name")]
}
function isNotAnEmptySelection(jquery_Selection){
  return jquery_Selection.length != 0
}

quotewindow  = (function (w) {
    w.onchangetheme = [(theme) => {}]
    var qstrap = $("<quotestrap/>")[0]
    $("head").append(qstrap)
    qstrap.setAttribute("name", "Bootswatch")
    console.log(getMeta("[name='quotestrap:bootswatch-api']"))
    if(!getMeta("[name='quotestrap:bootswatch-api']")){
        alert('<meta> for bootswatch api not found.')
        return
    }
    if(!getMeta("[name='quotestrap:selector']")){
        alert('<meta> for bootswatch selector not found.')
        return
    }
    if (!w.jQuery) {
        alert('jQuery is required.');
        return;
    }
    if ($('#bootswatch').length) {
        alert('QuoteStrap already loaded.');
        return;
    }
    var $link = $('<link>', {
        rel: 'stylesheet',
        id: 'bootswatch'
    }).appendTo('head');
    var $select = $('<select class="form-control col-sm-9" data-live-search="true" id="quotestrap">', {
        html: '<option value="null">Bootswatch</option>'
    });
    w.$select = $select
    try {
        $select.selectpicker();
        $select.selectpicker('setStyle', 'btn-info').selectpicker('setStyle', 'btn-sm');
    } catch(e) {
        console.log("Error while trying to promote to SelectPicker.");
        console.error(e);
    }
    // $(`<small class="help-block">Theme selector by Quotestrap (Free).</small>`).appendTo(getMeta("[name='quotestrap:selector']"));
    $select.on('change', function (e) {
        var value = $select.val();
        value && $link.attr('href', value);
        console.log($("option[value='" + value + "']")[0].getAttribute("thumbnail"))
        qstrap.setAttribute("name", $("option[value='" + value + "']")[0].getAttribute("name"))
        selector = $("#theme")
        if (isNotAnEmptySelection(selector)){
          selector[0].setAttribute("src",$("option[value='" + value + "']")[0].getAttribute("thumbnail"))
        }
        localStorage.setItem("quotestrap-theme", $("option[value='" + value + "']")[0].getAttribute("name"))
        for (var hook in w.onchangetheme){
            console.log("Executing Hook...")
            w.onchangetheme[hook](getQMeta())
            console.log("Finished Hook",hook)
        }
    });
    $select.append('<option value="null" thumbnail="https://www.bing.com/th?id=OIP.AC9frN1qFnn-I2JCycN8fwHaEK&w=248&h=137&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2">Default (No Theme)</option>')
    $.ajax({
        url: getMeta("[name='quotestrap:bootswatch-api']")
    }).done(function (data, status, xhr) {
        w.data = {
        "Bootswatch":{"name": "Default",  "thumbnail": "https://www.bing.com/th?id=OIP.AC9frN1qFnn-I2JCycN8fwHaEK&w=248&h=137&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"}
        }
        console.log(data)
        function dot(val, key) {
            console.log('<option value="' + val.cssCdn + '" thumbnail="' + val.thumbnail + '" name="' + val.name + '>' + val.name + ' - ' + val.description + '</option>')
            $select.append('<option value="' + val.cssCdn + '" thumbnail="' + val.thumbnail + '" name="' + val.name + '">' + val.name + ' - ' + val.description + '</option>')
            w.data[val.name] = val
        };
        data.themes.forEach(dot);
        console.log($select)
        w.selected = localStorage.getItem("quotestrap-theme")
        
        if (w.selected != null){
          $op = $("option:contains(\"" + w.selected + "\")")
          $op.attr("selected", "")
          console.log($op)
          $op.change()
        }
        try {
            $select.selectpicker('render');
        } catch(e) {
            console.log("Error while trying to promote to SelectPicker.");
            console.error(e);
        }
    });
    $(getMeta("[name='quotestrap:selector']")).append($select)
    return w
})(window);