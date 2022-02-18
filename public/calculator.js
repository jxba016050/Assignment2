var totalCount = 5;

function calculate() {
    for (var i = 1; i < totalCount; i++) {
        var num = document.getElementById(i + "num").value;
        var den = document.getElementById(i + "deno").value;
        var per = (num / den) * 100;
        if (isFinite(per) == false || per < 0) {
            document.getElementById("percentage" + i).innerHTML = "";
            continue;
        }
        per = Math.round(per * 100) / 100;
        document.getElementById("percentage" + i).innerHTML = per + "%";
    }
}

function addRow() {
    var newTb=document.getElementById("format");
        var tr=document.createElement("tr");

        var td1=document.createElement("td");
        td1.innerHTML="Activity "+totalCount;
        var td2=document.createElement("td");
        td2.innerHTML="A"+totalCount;
            
        var td3=document.createElement("td");
        td3.innerHTML='<input id="' + totalCount + 'weight" type="number">';
        var td4=document.createElement("td");
        td4.innerHTML='<input id="' + totalCount + 'num" type="number" onkeydown="calculate()" onkeyup="calculate()"> / <input id="' + totalCount + 'deno" type="number" onkeydown="calculate()" onkeyup="calculate()">';
        var td5=document.createElement("td");
        td5.id="percentage" + totalCount ;
        td5.className="per";
            
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        newTb.appendChild(tr);
    totalCount++;  
}

function weighted() {
    var sum = 0;
    var weightTotal = 0
    for (var i = 1; i < totalCount; i++) {
        var weight = document.getElementById(i + "weight").value;
        var numerator = document.getElementById( i + "num").value;
        var denominator = document.getElementById( i + "deno").value;
        weightTotal += parseInt(weight);
        var value = numerator / denominator * weight;
        if (isFinite(value) == false || value < 0) {
            continue;
        }
        sum = sum + value;
    }
    var result = (sum / weightTotal) * 100;
    result = Math.round(result * 100) / 100;
    document.getElementById("total_per").innerHTML = result + "%";
}

function mean() {
    var total = 0;
    var count = 0;
    for (var i = 1; i < totalCount; i++) {
        var num = document.getElementById( i + "num").value;
        var den = document.getElementById(i + "deno").value;
        var tempTotal = num / den;
        if (isFinite(tempTotal) == false || tempTotal < 0) {
            continue;
        }
        count++;
        total += parseFloat(tempTotal);
    }
    total = total / count * 100;
    total = Math.round(total * 100) / 100;
    document.getElementById("total_per").innerHTML = total + "%";
}