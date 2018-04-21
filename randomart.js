const b_table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".split(' ').map(function(s){ return parseInt(s,16) });
function b_crc32 (str) {
    let crc = -1;
    for(let i=0, iTop=str.length; i<iTop; i++) {
        crc = ( crc >>> 8 ) ^ b_table[( crc ^ str.charCodeAt( i ) ) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
};

const palettes = [["#69D2E7","#A7DBD8","#E0E4CC","#F38630","#FA6900"],["#FE4365","#FC9D9A","#F9CDAD","#C8C8A9","#83AF9B"],["#ECD078","#D95B43","#C02942","#542437","#53777A"],["#556270","#4ECDC4","#C7F464","#FF6B6B","#C44D58"],["#774F38","#E08E79","#F1D4AF","#ECE5CE","#C5E0DC"],["#E8DDCB","#CDB380","#036564","#033649","#031634"],["#490A3D","#BD1550","#E97F02","#F8CA00","#8A9B0F"],["#594F4F","#547980","#45ADA8","#9DE0AD","#E5FCC2"],["#00A0B0","#6A4A3C","#CC333F","#EB6841","#EDC951"],["#E94E77","#D68189","#C6A49A","#C6E5D9","#F4EAD5"],["#D9CEB2","#948C75","#D5DED9","#7A6A53","#99B2B7"],["#FFFFFF","#CBE86B","#F2E9E1","#1C140D","#CBE86B"],["#EFFFCD","#DCE9BE","#555152","#2E2633","#99173C"],["#3FB8AF","#7FC7AF","#DAD8A7","#FF9E9D","#FF3D7F"],["#343838","#005F6B","#008C9E","#00B4CC","#00DFFC"],["#413E4A","#73626E","#B38184","#F0B49E","#F7E4BE"],["#99B898","#FECEA8","#FF847C","#E84A5F","#2A363B"],["#FF4E50","#FC913A","#F9D423","#EDE574","#E1F5C4"],["#554236","#F77825","#D3CE3D","#F1EFA5","#60B99A"],["#351330","#424254","#64908A","#E8CAA4","#CC2A41"],["#00A8C6","#40C0CB","#F9F2E7","#AEE239","#8FBE00"],["#FF4242","#F4FAD2","#D4EE5E","#E1EDB9","#F0F2EB"],["#655643","#80BCA3","#F6F7BD","#E6AC27","#BF4D28"],["#8C2318","#5E8C6A","#88A65E","#BFB35A","#F2C45A"],["#FAD089","#FF9C5B","#F5634A","#ED303C","#3B8183"],["#BCBDAC","#CFBE27","#F27435","#F02475","#3B2D38"],["#D1E751","#FFFFFF","#000000","#4DBCE9","#26ADE4"],["#FF9900","#424242","#E9E9E9","#BCBCBC","#3299BB"],["#5D4157","#838689","#A8CABA","#CAD7B2","#EBE3AA"],["#5E412F","#FCEBB6","#78C0A8","#F07818","#F0A830"],["#EEE6AB","#C5BC8E","#696758","#45484B","#36393B"],["#1B676B","#519548","#88C425","#BEF202","#EAFDE6"],["#F8B195","#F67280","#C06C84","#6C5B7B","#355C7D"],["#452632","#91204D","#E4844A","#E8BF56","#E2F7CE"],["#F04155","#FF823A","#F2F26F","#FFF7BD","#95CFB7"],["#F0D8A8","#3D1C00","#86B8B1","#F2D694","#FA2A00"],["#2A044A","#0B2E59","#0D6759","#7AB317","#A0C55F"],["#67917A","#170409","#B8AF03","#CCBF82","#E33258"],["#B9D7D9","#668284","#2A2829","#493736","#7B3B3B"],["#BBBB88","#CCC68D","#EEDD99","#EEC290","#EEAA88"],["#A3A948","#EDB92E","#F85931","#CE1836","#009989"],["#E8D5B7","#0E2430","#FC3A51","#F5B349","#E8D5B9"],["#B3CC57","#ECF081","#FFBE40","#EF746F","#AB3E5B"],["#AB526B","#BCA297","#C5CEAE","#F0E2A4","#F4EBC3"],["#607848","#789048","#C0D860","#F0F0D8","#604848"],["#515151","#FFFFFF","#00B4FF","#EEEEEE"],["#3E4147","#FFFEDF","#DFBA69","#5A2E2E","#2A2C31"],["#300030","#480048","#601848","#C04848","#F07241"],["#1C2130","#028F76","#B3E099","#FFEAAD","#D14334"],["#A8E6CE","#DCEDC2","#FFD3B5","#FFAAA6","#FF8C94"],["#EDEBE6","#D6E1C7","#94C7B6","#403B33","#D3643B"],["#FDF1CC","#C6D6B8","#987F69","#E3AD40","#FCD036"],["#AAB3AB","#C4CBB7","#EBEFC9","#EEE0B7","#E8CAAF"],["#CC0C39","#E6781E","#C8CF02","#F8FCC1","#1693A7"],["#3A111C","#574951","#83988E","#BCDEA5","#E6F9BC"],["#FC354C","#29221F","#13747D","#0ABFBC","#FCF7C5"],["#B9D3B0","#81BDA4","#B28774","#F88F79","#F6AA93"],["#5E3929","#CD8C52","#B7D1A3","#DEE8BE","#FCF7D3"],["#230F2B","#F21D41","#EBEBBC","#BCE3C5","#82B3AE"],["#5C323E","#A82743","#E15E32","#C0D23E","#E5F04C"],["#4E395D","#827085","#8EBE94","#CCFC8E","#DC5B3E"],["#DAD6CA","#1BB0CE","#4F8699","#6A5E72","#563444"],["#C2412D","#D1AA34","#A7A844","#A46583","#5A1E4A"],["#D1313D","#E5625C","#F9BF76","#8EB2C5","#615375"],["#9D7E79","#CCAC95","#9A947C","#748B83","#5B756C"],["#1C0113","#6B0103","#A30006","#C21A01","#F03C02"],["#8DCCAD","#988864","#FEA6A2","#F9D6AC","#FFE9AF"],["#CFFFDD","#B4DEC1","#5C5863","#A85163","#FF1F4C"],["#75616B","#BFCFF7","#DCE4F7","#F8F3BF","#D34017"],["#382F32","#FFEAF2","#FCD9E5","#FBC5D8","#F1396D"],["#B6D8C0","#C8D9BF","#DADABD","#ECDBBC","#FEDCBA"],["#E3DFBA","#C8D6BF","#93CCC6","#6CBDB5","#1A1F1E"],["#A7C5BD","#E5DDCB","#EB7B59","#CF4647","#524656"],["#9DC9AC","#FFFEC7","#F56218","#FF9D2E","#919167"],["#413D3D","#040004","#C8FF00","#FA023C","#4B000F"],["#EDF6EE","#D1C089","#B3204D","#412E28","#151101"],["#A8A7A7","#CC527A","#E8175D","#474747","#363636"],["#7E5686","#A5AAD9","#E8F9A2","#F8A13F","#BA3C3D"],["#FFEDBF","#F7803C","#F54828","#2E0D23","#F8E4C1"],["#C1B398","#605951","#FBEEC2","#61A6AB","#ACCEC0"],["#5E9FA3","#DCD1B4","#FAB87F","#F87E7B","#B05574"],["#951F2B","#F5F4D7","#E0DFB1","#A5A36C","#535233"],["#FFFBB7","#A6F6AF","#66B6AB","#5B7C8D","#4F2958"],["#000000","#9F111B","#B11623","#292C37","#CCCCCC"],["#9CDDC8","#BFD8AD","#DDD9AB","#F7AF63","#633D2E"],["#EFF3CD","#B2D5BA","#61ADA0","#248F8D","#605063"],["#84B295","#ECCF8D","#BB8138","#AC2005","#2C1507"],["#FCFEF5","#E9FFE1","#CDCFB7","#D6E6C3","#FAFBE3"],["#0CA5B0","#4E3F30","#FEFEEB","#F8F4E4","#A5B3AA"],["#4D3B3B","#DE6262","#FFB88C","#FFD0B3","#F5E0D3"],["#B5AC01","#ECBA09","#E86E1C","#D41E45","#1B1521"],["#379F7A","#78AE62","#BBB749","#E0FBAC","#1F1C0D"],["#FFE181","#EEE9E5","#FAD3B2","#FFBA7F","#FF9C97"],["#4E4D4A","#353432","#94BA65","#2790B0","#2B4E72"],["#A70267","#F10C49","#FB6B41","#F6D86B","#339194"],["#30261C","#403831","#36544F","#1F5F61","#0B8185"],["#2D2D29","#215A6D","#3CA2A2","#92C7A3","#DFECE6"],["#F38A8A","#55443D","#A0CAB5","#CDE9CA","#F1EDD0"],["#793A57","#4D3339","#8C873E","#D1C5A5","#A38A5F"],["#11766D","#410936","#A40B54","#E46F0A","#F0B300"],["#AAFF00","#FFAA00","#FF00AA","#AA00FF","#00AAFF"],["#C75233","#C78933","#D6CEAA","#79B5AC","#5E2F46"],["#F8EDD1","#D88A8A","#474843","#9D9D93","#C5CFC6"],["#6DA67A","#77B885","#86C28B","#859987","#4A4857"],["#1B325F","#9CC4E4","#E9F2F9","#3A89C9","#F26C4F"],["#BED6C7","#ADC0B4","#8A7E66","#A79B83","#BBB2A1"],["#046D8B","#309292","#2FB8AC","#93A42A","#ECBE13"],["#82837E","#94B053","#BDEB07","#BFFA37","#E0E0E0"],["#312736","#D4838F","#D6ABB1","#D9D9D9","#C4FFEB"],["#E5EAA4","#A8C4A2","#69A5A4","#616382","#66245B"],["#6DA67A","#99A66D","#A9BD68","#B5CC6A","#C0DE5D"],["#395A4F","#432330","#853C43","#F25C5E","#FFA566"],["#331327","#991766","#D90F5A","#F34739","#FF6E27"],["#FDFFD9","#FFF0B8","#FFD6A3","#FAAD8E","#142F30"],["#E21B5A","#9E0C39","#333333","#FBFFE3","#83A300"],["#FBC599","#CDBB93","#9EAE8A","#335650","#F35F55"],["#C7FCD7","#D9D5A7","#D9AB91","#E6867A","#ED4A6A"],["#EC4401","#CC9B25","#13CD4A","#7B6ED6","#5E525C"],["#BF496A","#B39C82","#B8C99D","#F0D399","#595151"],["#FFEFD3","#FFFEE4","#D0ECEA","#9FD6D2","#8B7A5E"],["#F1396D","#FD6081","#F3FFEB","#ACC95F","#8F9924"],["#F6F6F6","#E8E8E8","#333333","#990100","#B90504"],["#261C21","#6E1E62","#B0254F","#DE4126","#EB9605"],["#E9E0D1","#91A398","#33605A","#070001","#68462B"],["#F2E3C6","#FFC6A5","#E6324B","#2B2B2B","#353634"],["#FFAB07","#E9D558","#72AD75","#0E8D94","#434D53"],["#59B390","#F0DDAA","#E47C5D","#E32D40","#152B3C"],["#FDE6BD","#A1C5AB","#F4DD51","#D11E48","#632F53"],["#E4E4C5","#B9D48B","#8D2036","#CE0A31","#D3E4C5"],["#512B52","#635274","#7BB0A8","#A7DBAB","#E4F5B1"],["#805841","#DCF7F3","#FFFCDD","#FFD8D8","#F5A2A2"],["#E65540","#F8ECC2","#65A8A6","#79896D"],["#CAFF42","#EBF7F8","#D0E0EB","#88ABC2","#49708A"],["#595643","#4E6B66","#ED834E","#EBCC6E","#EBE1C5"],["#E4DED0","#ABCCBD","#7DBEB8","#181619","#E32F21"],["#058789","#503D2E","#D54B1A","#E3A72F","#F0ECC9"],["#FF003C","#FF8A00","#FABE28","#88C100","#00C176"],["#311D39","#67434F","#9B8E7E","#C3CCAF","#A51A41"],["#EFD9B4","#D6A692","#A39081","#4D6160","#292522"],["#C6CCA5","#8AB8A8","#6B9997","#54787D","#615145"],["#CC5D4C","#FFFEC6","#C7D1AF","#96B49C","#5B5847"],["#111625","#341931","#571B3C","#7A1E48","#9D2053"],["#EFEECC","#FE8B05","#FE0557","#400403","#0AABBA"],["#CCF390","#E0E05A","#F7C41F","#FC930A","#FF003D"],["#73C8A9","#DEE1B6","#E1B866","#BD5532","#373B44"],["#79254A","#795C64","#79927D","#AEB18E","#E3CF9E"],["#E0EFF1","#7DB4B5","#FFFFFF","#680148","#000000"],["#F06D61","#DA825F","#C4975C","#A8AB7B","#8CBF99"],["#2D1B33","#F36A71","#EE887A","#E4E391","#9ABC8A"],["#2B2726","#0A516D","#018790","#7DAD93","#BACCA4"],["#95A131","#C8CD3B","#F6F1DE","#F5B9AE","#EE0B5B"],["#360745","#D61C59","#E7D84B","#EFEAC5","#1B8798"],["#E3E8CD","#BCD8BF","#D3B9A3","#EE9C92","#FE857E"],["#807462","#A69785","#B8FAFF","#E8FDFF","#665C49"],["#4B1139","#3B4058","#2A6E78","#7A907C","#C9B180"],["#FC284F","#FF824A","#FEA887","#F6E7F7","#D1D0D7"],["#FFB884","#F5DF98","#FFF8D4","#C0D1C2","#2E4347"],["#027B7F","#FFA588","#D62957","#BF1E62","#572E4F"],["#80A8A8","#909D9E","#A88C8C","#FF0D51","#7A8C89"],["#A69E80","#E0BA9B","#E7A97E","#D28574","#3B1922"],["#A1DBB2","#FEE5AD","#FACA66","#F7A541","#F45D4C"],["#641F5E","#676077","#65AC92","#C2C092","#EDD48E"],["#FFF3DB","#E7E4D5","#D3C8B4","#C84648","#703E3B"],["#F5DD9D","#BCC499","#92A68A","#7B8F8A","#506266"],["#2B222C","#5E4352","#965D62","#C7956D","#F2D974"],["#D4F7DC","#DBE7B4","#DBC092","#E0846D","#F51441"],["#A32C28","#1C090B","#384030","#7B8055","#BCA875"],["#85847E","#AB6A6E","#F7345B","#353130","#CBCFB4"],["#E6B39A","#E6CBA5","#EDE3B4","#8B9E9B","#6D7578"],["#11644D","#A0B046","#F2C94E","#F78145","#F24E4E"],["#6D9788","#1E2528","#7E1C13","#BF0A0D","#E6E1C2"],["#23192D","#FD0A54","#F57576","#FEBF97","#F5ECB7"],["#EB9C4D","#F2D680","#F3FFCF","#BAC9A9","#697060"],["#D3D5B0","#B5CEA4","#9DC19D","#8C7C62","#71443F"],["#452E3C","#FF3D5A","#FFB969","#EAF27E","#3B8C88"],["#041122","#259073","#7FDA89","#C8E98E","#E6F99D"],["#B1E6D1","#77B1A9","#3D7B80","#270A33","#451A3E"],["#9D9E94","#C99E93","#F59D92","#E5B8AD","#D5D2C8"],["#FDCFBF","#FEB89F","#E23D75","#5F0D3B","#742365"],["#540045","#C60052","#FF714B","#EAFF87","#ACFFE9"],["#B7CBBF","#8C886F","#F9A799","#F4BFAD","#F5DABD"],["#280904","#680E34","#9A151A","#C21B12","#FC4B2A"],["#F0FFC9","#A9DA88","#62997A","#72243D","#3B0819"],["#429398","#6B5D4D","#B0A18F","#DFCDB4","#FBEED3"],["#E6EBA9","#ABBB9F","#6F8B94","#706482","#703D6F"],["#A3C68C","#879676","#6E6662","#4F364A","#340735"],["#44749D","#C6D4E1","#FFFFFF","#EBE7E0","#BDB8AD"],["#322938","#89A194","#CFC89A","#CC883A","#A14016"],["#CFB590","#9E9A41","#758918","#564334","#49281F"],["#FA6A64","#7A4E48","#4A4031","#F6E2BB","#9EC6B8"],["#1D1313","#24B694","#D22042","#A3B808","#30C4C9"],["#F6D76B","#FF9036","#D6254D","#FF5475","#FDEBA9"],["#E7EDEA","#FFC52C","#FB0C06","#030D4F","#CEECEF"],["#373737","#8DB986","#ACCE91","#BADB73","#EFEAE4"],["#161616","#C94D65","#E7C049","#92B35A","#1F6764"],["#26251C","#EB0A44","#F2643D","#F2A73D","#A0E8B7"],["#4B3E4D","#1E8C93","#DBD8A2","#C4AC30","#D74F33"],["#8D7966","#A8A39D","#D8C8B8","#E2DDD9","#F8F1E9"],["#F2E8C4","#98D9B6","#3EC9A7","#2B879E","#616668"],["#5CACC4","#8CD19D","#CEE879","#FCB653","#FF5254"]];


function Alea(seed) {
    if(seed === undefined) {seed = +new Date() + Math.random();}
    function Mash() {
        let n = 4022871197;
        return function(r) {
            for(let t, s, u = 0, e = 0.02519603282416938; u < r.length; u++)
            s = r.charCodeAt(u), f = (e * (n += s) - (n*e|0)),
            n = 4294967296 * ((t = f * (e*n|0)) - (t|0)) + (t|0);
            return (n|0) * 2.3283064365386963e-10;
        }
    }
    return function() {
        let m = Mash(), a = m(" "), b = m(" "), c = m(" "), x = 1, y;
        seed = seed.toString(), a -= m(seed), b -= m(seed), c -= m(seed);
        a < 0 && a++, b < 0 && b++, c < 0 && c++;
        return function() {
            let y = x * 2.3283064365386963e-10 + a * 2091639; a = b, b = c;
            return c = y - (x = y|0);
        };
    }();
}


class Random {

  constructor(seed) {
    this.prng = Alea(seed);
  }

  uniform(min = 0, max = 1) {
    return this.prng() * (max - min) + min;
  }

  randrange(min, max) {
    if (max !== undefined) {
      min = Math.ceil(min);
      max = Math.floor(max);
    } else {
      min = 0;
      max = Math.ceil(min);
    }
    return Math.floor(this.prng() * (max - min)) + min;
  }

  choice(arr) {
    let idx = this.randrange(0, arr.length)
    return arr[idx]
  }
}

let random = new Random();

function average(c1, c2, w = 0.5) {
    /* Compute the weighted average of two colors. With w = 0.5 we get the average. */
    let b1, b2, b3, g1, g2, g3, r1, r2, r3;
    [r1, g1, b1] = c1;
    [r2, g2, b2] = c2;
    r3 = ((w * r1) + ((1 - w) * r2));
    g3 = ((w * g1) + ((1 - w) * g2));
    b3 = ((w * b1) + ((1 - w) * b2));
    return [r3, g3, b3];
}

function well(x) {
    /* A function which looks a bit like a well. */
    return (1 - (2 / Math.pow((1 + (x * x)), 8)));
}
function tent(x) {
    /* A function that looks a bit like a tent. */
    return (1 - (2 * Math.abs(x)));
}

function brightness(R,G,B) {
    R = (1.0 + R);
    G = (1.0 + G);
    B = (1.0 + B);
    return Math.sqrt(0.299*(R*R) + 0.587*(G*G) + 0.114*(B*B)) - 1.0;
}

function parseColor(s) {
  if (s.startsWith('#')) s = s.substring(1);
  const num = parseInt(s, 16);
  return [(num >> 16) & 0xFF, (num >> 8) & 0xFF, num & 0xFF ]
}

class Const {
    constructor(c) {
        this.c = c;
        if (typeof(c) === 'number') {
            this.val = [this.c, this.c, this.c];
        } else {
            this.val = this.c;
        }
    }
    toString() {
        return `Const(${this.c})`;
    }
    eval(x, y) {
        return this.val;
    }
}

class VarX {
    static get arity() { return 0 }
    static get mindepth() { return 4 }

    constructor() {
    }
    toString() {
        return "x";
    }
    eval(x, y) {
        return [x, x, x];
    }
}

class VarY {
    static get arity() { return 0 }
    static get mindepth() { return 4 }

    constructor() {
    }
    toString() {
        return "y";
    }
    eval(x, y) {
        return [y, y, y];
    }
}

class BW {
    static get arity() { return 0 }
    static get mindepth() { return 4 }

    constructor() {
        this.c = random.uniform(-0.8, 0.8);
    }
    toString() {
        return `BW(${this.c.toFixed(2)})`;
    }
    eval(x, y) {
        return [this.c, this.c, this.c];
    }
}

class RandRGB {
    static get arity() { return 0 }
    static get mindepth() { return 4 }

    constructor() {
        this.c = [random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1)];
    }
    toString() {
        return `RGB(${this.c[0].toFixed(2)}, ${this.c[1].toFixed(2)}, ${this.c[2].toFixed(2)})`;
    }
    eval(x, y) {
        return this.c;
    }
}

class RGB {
    static get arity() { return 3 }
    static get mindepth() { return 4 }

    constructor(e1,e2,e3) {
        this.e1 = e1;
        this.e2 = e2;
        this.e3 = e3;
    }
    toString() {
        return `RGB(${this.e1}, ${this.e2}, ${this.e3})`;
    }
    eval(x, y) {
        let c1 = this.e1.eval(x, y);
        let c2 = this.e2.eval(x, y);
        let c3 = this.e3.eval(x, y);
        return [brightness(...c1), brightness(...c2), brightness(...c3)];
    }
}

let palette = palettes[0];
let paletteIdx = 0;

class Palette {
    static get arity() { return 0 }
    static get mindepth() { return 4 }

    constructor() {
        this.hex = palette[paletteIdx++];
        if (paletteIdx >= palette.length)
          paletteIdx = 0;
        this.c = parseColor(this.hex).map(i => (i/128 - 1.0));
    }
    toString() {
        return `${this.hex}`;
    }
    eval(x, y) {
        return this.c;
    }
}

class Sum {
    static get arity() { return 2 }
    static get mindepth() { return 2 }

    constructor(e1, e2) {
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Sum(${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        return average(this.e1.eval(x, y), this.e2.eval(x, y));
    }
}

class Mul {
    static get arity() { return 2 }
    static get mindepth() { return 2 }

    constructor(e1, e2) {
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Mul(${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        let b1, b2, g1, g2, r1, r2;
        [r1, g1, b1] = this.e1.eval(x, y);
        [r2, g2, b2] = this.e2.eval(x, y);
        return [r1 * r2, g1 * g2, b1 * b2];
    }
}

class Mod {
    static get arity() { return 2 }
    static get mindepth() { return 3 }

    constructor(e1, e2) {
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Mod(${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        let b1, b2, g1, g2, r1, r2;
        [r1, g1, b1] = this.e1.eval(x, y);
        [r2, g2, b2] = this.e2.eval(x, y);
        if (r2 == 0 || g2 == 0 || b2 == 0) {
          return [0, 0, 0];
        }
        return [r1 % r2, g1 % g2, b1 % b2];
    }
}

class ChBoard {
    static get arity() { return 0 }
    static get mindepth() { return 5 }

    constructor(e1, e2) {
        this.wX = random.uniform(0.01, 1.0);
        this.wY = random.uniform(0.01, 1.0);
    }
    toString() {
        return `ChBoard()`;
    }
    eval(x, y) {
        let isOdd = false;
        isOdd ^= Math.floor(x/this.wX) & 1;
        isOdd ^= Math.floor(y/this.wY) & 1;

        return (isOdd) ? [-1,-1,-1] : [1,1,1];
    }
}

class Turbulence { // Noise
    static get arity() { return 1 }
    static get mindepth() { return 3 }

    constructor(e1, e2) {
        this.e1 = e1;
        this.e2 = e2;

        this.octaves = random.randrange(2, 6);
        this.freq = random.uniform(0.1, 2);
        this.ampl = random.uniform(0.1, 2);
    }
    toString() {
        return `Turbulence(${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        let c1 = this.e1.eval(x, y);
        let c2 = this.e2.eval(x, y);

        return (isOdd) ? c1 : c2;
    }
}

class Not {
    static get arity() { return 1 }
    static get mindepth() { return 3 }

    constructor(e) {
        this.e = e;
    }
    toString() {
        return `Not(${this.e})`;
    }
    eval(x, y) {
        let [r, g, b] = this.e.eval(x, y);
        return [-1.0*r, -1.0*g, -1.0*b];
    }
}

class Well {
    static get arity() { return 1 }
    static get mindepth() { return 3 }

    constructor(e) {
        this.e = e;
    }
    toString() {
        return `Well(${this.e})`;
    }
    eval(x, y) {
        let [r, g, b] = this.e.eval(x, y);
        return [well(r), well(g), well(b)];
    }
}

class Tent {
    static get arity() { return 1 }
    static get mindepth() { return 3 }

    constructor(e) {
        this.e = e;
    }
    toString() {
        return `Tent(${this.e})`;
    }
    eval(x, y) {
        let b, g, r;
        [r, g, b] = this.e.eval(x, y);
        return [tent(r), tent(g), tent(b)];
    }
}

class Sin {
    static get arity() { return 1 }
    static get mindepth() { return 0 }

    constructor(e) {
        this.e = e;
        this.phase = random.uniform(0, Math.PI);
        this.freq = random.uniform(1.0, 6.0);
    }
    toString() {
        return `Sin(${this.phase.toFixed(2)} + ${this.freq.toFixed(2)} * ${this.e})`;
    }
    eval(x, y) {
        let b1, b2, g1, g2, r1, r2;
        [r1, g1, b1] = this.e.eval(x, y);
        r2 = Math.sin((this.phase + (this.freq * r1)));
        g2 = Math.sin((this.phase + (this.freq * g1)));
        b2 = Math.sin((this.phase + (this.freq * b1)));
        return [r2, g2, b2];
    }
}

class Level {
    static get arity() { return 3 }
    static get mindepth() { return 0 }

    constructor(level, e1, e2) {
        this.treshold = random.uniform(-0.8, 0.8);
        this.level = level;
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Level(${this.treshold.toFixed(2)}, ${this.level}, ${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        let b1, b2, b3, b4, g1, g2, g3, g4, r1, r2, r3, r4;
        [r1, g1, b1] = this.level.eval(x, y);
        [r2, g2, b2] = this.e1.eval(x, y);
        [r3, g3, b3] = this.e2.eval(x, y);
        r4 = ((r1 < this.treshold) ? r2 : r3);
        g4 = ((g1 < this.treshold) ? g2 : g3);
        b4 = ((b1 < this.treshold) ? b2 : b3);
        return [r4, g4, b4];
    }
}

class Mix {
    static get arity() { return 3 }
    static get mindepth() { return 0 }

    constructor(w, e1, e2) {
        this.w = w;
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Mix(${this.w}, ${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        let c1, c2, w;
        w = (0.5 * (this.w.eval(x, y)[0] + 1.0));
        c1 = this.e1.eval(x, y);
        c2 = this.e2.eval(x, y);
        return average(c1, c2, w);
    }
}

const operators = [VarX, VarY, Palette, BW, RGB, Sum, Mul, Not, Mod, Sin, Tent, Well, Level, Mix];
const operators0 = operators.filter(i => (i.arity == 0))
const operators1 = operators.filter(i => (i.arity > 0))

function generateTree(k, depth) {
    /* Randonly generate an expession of a given size. */
    if (depth >= k) {
        let op = random.choice(operators0);
        return new op();
    } else {
        let op = random.choice(operators1.filter(i => (depth >= i.mindepth)));
        //while (depth < k && random.uniform() <= 0.3) depth++;
        //depth += random.randrange(0, op.arity-1);
        depth++;
        let args = [];
        for (let i = 0; i<op.arity; i++) {
          //if (random.uniform() <= 0.2) depth++;
          args.push(generateTree(k, depth))
        }
        return new op(...args);
    }
}

function generate(seed, k = 50) {
  random = new Random(seed);
  palette = random.choice(palettes);
  paletteIdx = 0;
  return generateTree(k, 0);
}
