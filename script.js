function IpGetInf() {
    var value1 = document.getElementById("value1").value;
    var value2 = document.getElementById("value2").value;
    var value3 = document.getElementById("value3").value;
    var value4 = document.getElementById("value4").value;
    var cidr = document.getElementById("cidr").value;

    if (
      value1 >= 0 &&
      value1 <= 255 &&
      value2 >= 0 &&
      value2 <= 255 &&
      value3 >= 0 &&
      value3 <= 255 &&
      value4 >= 0 &&
      value4 <= 255 &&
      cidr >= 0 &&
      cidr <= 32
    ) {
      
      document.getElementById("resIP").innerHTML =
        value1 + "." + value2 + "." + value3 + "." + value4;

      
      var ipBin = {};
      ipBin[1] = String("00000000" + parseInt(value1, 10).toString(2)).slice(-8);
      ipBin[2] = String("00000000" + parseInt(value2, 10).toString(2)).slice(-8);

      ipBin[3] = String("00000000" + parseInt(value3, 10).toString(2)).slice(-8);
      ipBin[4] = String("00000000" + parseInt(value4, 10).toString(2)).slice(-8);

      
      var mask = cidr;
      var X = Math.ceil(mask / 8);
      var XCount = mask % 8;
      if (XCount == 0) X++;
      var maskXBinary = "";
      var maskX = "";
      for (var i = 1; i <= 8; i++) {
        if (XCount >= i) {
          maskXBinary += "1";
        } else {
          maskXBinary += "0";
        }
      }
      
      maskBlock = parseInt(maskXBinary, 2);

      var netBinaryBlock = "";
      var bcBlockBinary = "";
      for (var i = 1; i <= 8; i++) {
        if (maskXBinary.substr(i - 1, 1) == "1") {
          netBinaryBlock += importantBlockBinary.substr(i - 1, 1);
          bcBlockBinary += importantBlockBinary.substr(i - 1, 1);
        } else {
          netBinaryBlock += "0";
          bcBlockBinary += "1";
        }
      }


      var mask = "";
      var net = "";
      var bc = "";
      var rangeA = "";
      var rangeB = "";


      for (var i = 1; i <= 4; i++) {
        if (X > i) {
          mask += "255";
          net += parseInt(ipBin[i], 2);
          bc += parseInt(ipBin[i], 2);
          rangeA += parseInt(ipBin[i], 2);
          rangeB += parseInt(ipBin[i], 2);
        } else if (X== i) {

          mask += maskBlock;
          net += parseInt(netBinaryBlock, 2);
          bc += parseInt(bcBlockBinary, 2);
          rangeA += parseInt(netBinaryBlock, 2) + 1;
          rangeB += parseInt(bcBlockBinary, 2) - 1;
        } else {
          mask += 0;
          net += "0";
          bc += "255";
          rangeA += 0;
          rangeB += 255;
        }

        if (i < 4) {
          mask += ".";
          net += ".";
          bc += ".";
          rangeA += ".";
          rangeB += ".";
        }
      }

      var HostBinary = "";
      for (var i = 31 - cidr; i >= 0; i--) {
        HostBinary = HostBinary + "1";
      }
      var maxHost = parseInt(HostBinary, 2);
      var SubNetBinary = "";
      for (var i = cidr; i >= 0; i--) {
        SubNetBinary = SubNetBinary + "1";
      }
      var maxSubnet = parseInt(SubNetBinary, 2);
      var CurrentSubnetBlockBinary = "";
      for (var i = XCount; i >= 0; i--) {
        CurrentSubnetBlockBinary = CurrentSubnetBlockBinary + "1";
      }
      
      var maxCurrentSubnetBlock = parseInt(CurrentSubnetBlockBinary , 2);

      document.getElementById("resMask").innerHTML = mask;
      document.getElementById("resNet").innerHTML = net;
      document.getElementById("resBC").innerHTML = bc;
      document.getElementById("resRange").innerHTML = rangeA + " - " + rangeB;
      document.getElementById("resBinIP").innerHTML =
        ipBin[1] + "." + ipBin[2] + "." + ipBin[3] + "." + ipBin[4];
    }
  }