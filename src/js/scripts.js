// usado para mandar coisas do main pra ca e visse versa
const { ipcRenderer} = require('electron')

let {PythonShell} = require('python-shell')
var path = require("path")
var ProgressBar = require('progressbar.js')

//migrado
function buscarMes(){
    
    const mes = document.getElementById('mes').value
    const ano = document.getElementById('ano').value

    var $ = jQuery = require("jquery")


    
    const { execFile } = require('child_process');
    if(document.getElementById('prevista').checked) {
        var prevista = "prevista"
        var exePath = path.resolve(__dirname+"../../../../engine/consulta-mes/dist/main/", './main.exe')
        console.log(exePath)
        const child = execFile(exePath, [mes, ano, prevista] ,(error, stdout, stderr) => {
          if (error) {
            throw error;
          }
        var results = stdout;
        $('.card-body.b').empty()

        function appendHtml(el, str) {
            var div = document.createElement('div'); //container to append to
            div.innerHTML = str;
            while (div.children.length > 0) {
                $('.card-body.b').append(div.children[0]);
            }
            }
        appendHtml(document.body, results)
        });
    }else if(document.getElementById('resultado').checked) {
        var resultado = "resultado"
        //Female radio button is checked
        var exePath = path.resolve(__dirname+"../../../../engine/consulta-mes/dist/main/", './main.exe')
        console.log(exePath)
        const child = execFile(exePath, [mes, ano, resultado] ,(error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            var results = stdout;
    
            $('.card-body.b').empty()

            function appendHtml(el, str) {
                var div = document.createElement('div'); //container to append to
                div.innerHTML = str;
                while (div.children.length > 0) {
                    $('.card-body.b').append(div.children[0]);
                }
                }
            appendHtml(document.body, results)
                //$('body').append(results);
        })


    }
}

//migrado
function buscarResponsaveis(){

    const responsavel = document.getElementById('responsaveis').value
    console.log(responsavel)
        
    const { execFile } = require('child_process');
    var exePath = path.resolve(__dirname+"../../../../engine/consulta-responsaveis/dist/main/", './main.exe')
    console.log(exePath)
    const child = execFile(exePath, [responsavel] ,(error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        results = stdout

        $('.card-body.b').empty()

        function appendHtml(el, str) {
            var div = document.createElement('div'); //container to append to
            div.innerHTML = str;
            while (div.children.length > 0) {
                $('.card-body.b').append(div.children[0]);
            }
          }
        appendHtml(document.body, results)
        //$('body').append(results);
})
}

//migrado
function buscarEscritorios(){
    var valuesEscritorios =Array.from($("#escritorios").find(':selected')).map(function(item){
        return $(item).text();
    });

    var valuesInstituicoes =Array.from($("#instituicoes").find(':selected')).map(function(item){
        return $(item).text();
    });

    const { execFile } = require('child_process');
    var exePath = path.resolve(__dirname+"../../../../engine/consulta-escritorio/dist/main/", './main.exe')
    console.log(exePath)
    const child = execFile(exePath, [valuesEscritorios, valuesInstituicoes] ,(error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        var results = stdout;
        $('.card-body.b').empty()

        function appendHtml(el, str) {
            var div = document.createElement('div'); //container to append to
            div.innerHTML = str;
            while (div.children.length > 0) {
                $('.card-body.b').append(div.children[0]);
            }
          }
        appendHtml(document.body, results)
        //$('body').append(results);
    })
}

//migrado
function buscarInstituicoes(){
    var valuesEscritorios =Array.from($("#escritorios").find(':selected')).map(function(item){
        return $(item).text();
    });

    var valuesInstituicoes =Array.from($("#instituicoes").find(':selected')).map(function(item){
        return $(item).text();
    });
    
    var valuesCategorias = Array.from($("#categorias").find(':selected')).map(function(item){
        return $(item).text().replace("\n","");
    });
    
    const { execFile } = require('child_process');
    var exePath = path.resolve(__dirname+"../../../../engine/consulta-instituicao/dist/main/", './main.exe')
    console.log(exePath)
    const child = execFile(exePath,[valuesEscritorios, valuesInstituicoes, valuesCategorias] ,(error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        var results = stdout;
        $('.card-body.b').empty()

        function appendHtml(el, str) {
            var div = document.createElement('div'); //container to append to
            div.innerHTML = str;
            while (div.children.length > 0) {
                $('.card-body.b').append(div.children[0]);
            }
          }
        appendHtml(document.body, results)
        //$('body').append(results);
    })
}

//migrado
function incluirDado(){
    var casosAndamento
    if ($(document).find('#casos-em-andamento').is(':checked')) {
        casosAndamento = "Sim"
    } else {
        casosAndamento = "Não"
    }
    
    var casosRevisao
    if ($(document).find('#casos-em-revisao').is(':checked')) {
        casosRevisao = "Sim"
    } else {
        casosRevisao = "Não"
    }
    
    var casosTranscricao
    if ($(document).find('#casos-em-transcricao').is(':checked')) {
        casosTranscricao = "Sim"
    } else {
        casosTranscricao = "Não"
    }

    var casosAprovacao
    if ($(document).find('#casos-em-aprovacao').is(':checked')) {
        casosAprovacao = "Sim"
    } else {
        casosAprovacao = "Não"
    }

    var valuesEscritorios =Array.from($("#escritorios").find(':selected')).map(function(item){
        return $(item).text();
    });

    var valuesInstituicoes = $("#instituicoes").find(':selected').text();
    
    const responsavel = document.getElementById('responsaveis').value

    const nomeCategoria = document.getElementById('nome-categoria').value

    const submissao = document.getElementById('submissao').value

    const status = document.getElementById('status').value

    const dataPrevista = document.getElementById('data-prevista').value

    const dataResultado = document.getElementById('data-resultado').value

    const Swal = require('sweetalert2')
    const { execFile } = require('child_process');
    var exePath = path.resolve(__dirname+"../../../../engine/incluir-dado/dist/main/", './main.exe')
    console.log(exePath)
    const child = execFile(exePath, [valuesEscritorios, valuesInstituicoes, responsavel, nomeCategoria, submissao, status, dataPrevista, dataResultado, casosAndamento, casosRevisao, casosTranscricao, casosAprovacao] ,(error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        var results = stdout;
        $('.card-body.b').empty()

        function appendHtml(el, str) {
            var div = document.createElement('div'); //container to append to
            div.innerHTML = str;
            while (div.children.length > 0) {
                $('.card-body.b').append(div.children[0]);
            }
          }
        appendHtml(document.body, results)
        Swal.fire('Registro(s) salvo(s)!', '', 'success')
        //$('body').append(results);
    })
}

//migrado
function buscaComplexa(){
    $('.card-body.b').empty()
    var casosAndamento
    if ($(document).find('#casos-em-andamento').is(':checked')) {
        casosAndamento = "Sim"
    } else {
        casosAndamento = "Não"
    }
    
    var casosRevisao
    if ($(document).find('#casos-em-revisao').is(':checked')) {
        casosRevisao = "Sim"
    } else {
        casosRevisao = "Não"
    }
    
    var casosTranscricao
    if ($(document).find('#casos-em-transcricao').is(':checked')) {
        casosTranscricao = "Sim"
    } else {
        casosTranscricao = "Não"
    }

    var casosAprovacao
    if ($(document).find('#casos-em-aprovacao').is(':checked')) {
        casosAprovacao = "Sim"
    } else {
        casosAprovacao = "Não"
    }
    
    var valuesEscritorios =Array.from($("#escritorios").find(':selected')).map(function(item){
        return $(item).text();
    });

    var valuesInstituicoes = Array.from($("#instituicoes").find(':selected')).map(function(item){
        return $(item).text();
    });

    var categorias = Array.from($("#categorias").find(':selected')).map(function(item){
        return $(item).text().replace("\n","");
    });
    
    const responsavel = document.getElementById('responsaveis').value


    const submissao = document.getElementById('submissao').value

    const status = document.getElementById('status').value

    const mes = document.getElementById('mes').value
    const ano = document.getElementById('ano').value
    
    const { execFile } = require('child_process');
    
    
    if(document.getElementById('prevista').checked==true) {
        console.log("é previstaaaaa")
        var prevista = "previsao"

        var exePath = path.resolve(__dirname+"../../../../engine/consulta-complexa/dist/main/", './main.exe')
        console.log(exePath)
        const child = execFile(exePath, [valuesEscritorios, valuesInstituicoes, responsavel, categorias, submissao, status, mes, ano, prevista, casosAndamento, casosRevisao, casosTranscricao, casosAprovacao] ,(error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            var results = stdout;
            console.log(results)
            $('.card-body.b').empty()

            function appendHtml(el, str) {
                var div = document.createElement('div'); //container to append to
                div.innerHTML = str;
                while (div.children.length > 0) {
                    $('.card-body.b').append(div.children[0]);
                }
            }
            appendHtml(document.body, results)
            //$('body').append(results);
        })

    }else if(document.getElementById('resultado').checked==true) {
        console.log("é resultadoooo")
        var resultado = "resultado"

        var exePath = path.resolve(__dirname+"../../../../engine/consulta-complexa/dist/main/", './main.exe')
        console.log(exePath)
        const child = execFile(exePath, [valuesEscritorios, valuesInstituicoes, responsavel, categorias, submissao, status, mes, ano, resultado, casosAndamento, casosRevisao, casosTranscricao, casosAprovacao] ,(error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            var results = stdout;
            console.log(results)
            $('.card-body.b').empty()

            function appendHtml(el, str) {
                var div = document.createElement('div'); //container to append to
                div.innerHTML = str;
                while (div.children.length > 0) {
                    $('.card-body.b').append(div.children[0]);
                }
            }
            appendHtml(document.body, results)
            //$('body').append(results);
        })
    }
    else{
        console.log("é nadaaa")
        
        var prevista = ""

        console.log(categorias)
        var exePath = path.resolve(__dirname+"../../../../engine/consulta-complexa/dist/main/", './main.exe')
        console.log(exePath)
        const child = execFile(exePath, [valuesEscritorios, valuesInstituicoes, responsavel, categorias, submissao, status, mes, ano, prevista, casosAndamento, casosRevisao, casosTranscricao, casosAprovacao], {maxBuffer: 1024 * 5000} ,(error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            var results = stdout;
            console.log(results)
            $('.card-body.b').empty()

            function appendHtml(el, str) {
                var div = document.createElement('div'); //container to append to
                div.innerHTML = str;
                while (div.children.length > 0) {
                    $('.card-body.b').append(div.children[0]);
                }
            }
            appendHtml(document.body, results)
            //$('body').append(results);
        })
    }

}

//migrado
function checarEscritorios(){
    var valuesCategorias = Array.from($("#categorias").find(':selected')).map(function(item){
        var optgroup = $(item).parent().attr('label');

        let finalString = optgroup+": "+$(item).text();
        console.log(finalString)
        return finalString

    });
       
    const { execFile } = require('child_process');
    var exePath = path.resolve(__dirname+"../../../../engine/editar-dado/dist/main/", './main.exe')
    console.log(exePath)
    const child = execFile(exePath, ["checar-escritorios", valuesCategorias] ,(error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        var results = stdout;
        console.log(results)
        formated = results.replace('[','')
        formated = formated.replace(']','')
        formated = formated.replace(/'/g,'')
        formated = formated.replace(/\s/g,'')

        let array2 = formated.split(',')
        console.log(array2)

        $("#escritorios").empty()
        for (var i = 0; i< array2.length; i++){
            $("#escritorios").append('<option value="'+array2[i]+'">'+array2[i]+'</option>');
            $("#escritorios").selectpicker("refresh");
        }

    })
}

//migrado
function buscarDados(){
    var valuesCategorias = Array.from($("#categorias").find(':selected')).map(function(item){
        var optgroup = $(item).parent().attr('label');

        let finalString = optgroup+": "+$(item).text();
        console.log(finalString)
        return finalString

    });

    var valuesEscritorio = Array.from($("#escritorios").find(':selected')).map(function(item){
        return $(item).text();
    });

    
    const { execFile } = require('child_process');
    
    var exePath = path.resolve(__dirname+"../../../../engine/editar-dado/dist/main/", './main.exe')
    console.log(exePath)
    const child = execFile(exePath, ["buscar-dados", valuesCategorias, valuesEscritorio] ,(error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        var results = stdout;
        
        formated = results.replace('[','')
        formated = formated.replace(']','')
        formated = formated.replace(/\\/g, '');
        formated = formated.replace(/\]/g, '');
        formated = formated.replace(/\[/g, '');
        formated = formated.replace(/'/g,'')
        formated = formated.replace(/\r/g,'')
        formated = formated.replace(/\n/g,'')
        //formated = formated.replace(/\s/g,'')

        let array2 = formated.split(',')

        // for(let i = 0; i<array2.length;i++){
        //     console.log(array2[i])
        // }
        console.log(array2)

        const moment = require('moment')
        const dataPrevistaFormatada = moment(array2[3].replace(/\"/g, '')).format('DD/MM/YYYY')
        document.getElementById("data-prevista").value = dataPrevistaFormatada;
        document.getElementById("data-resultado").value = array2[5].replace(/\"/g, '');
        document.getElementById("nome-categoria").value = array2[2].replace(/\"/g, '');
        document.getElementById("responsaveis").value = array2[6].replace(/\"/g, '');
        document.getElementById("submissao").value = array2[7].replace(/\"/g, '');
        document.getElementById("status").value = array2[8].replace(/\"/g, '');
        if (array2[9].replace(/\"/g, '')=="Sim"){
            document.getElementById("casos-em-andamento").checked = true
        }
        else{
            document.getElementById("casos-em-andamento").checked = false
        }

        if (array2[10].replace(/\"/g, '')=="Sim"){
            document.getElementById("casos-em-revisao").checked = true
        }
        else{
            document.getElementById("casos-em-revisao").checked = false
        }

        if (array2[11].replace(/\"/g, '')=="Sim"){
            document.getElementById("casos-em-transcricao").checked = true
        }
        else{
            document.getElementById("casos-em-transcricao").checked = false
        }
        if (array2[12].replace(/\"/g, '').substring(0,3)=="Sim"){
            console.log("È SIMMM")
            document.getElementById("casos-em-aprovacao").checked = true
        }
        else{
            document.getElementById("casos-em-aprovacao").checked = false
        }


    })
}

//migrado
function salvarDadosEditados(){
    var casosAndamento
    if ($(document).find('#casos-em-andamento').is(':checked')) {
        casosAndamento = "Sim"
    } else {
        casosAndamento = "Não"
    }
    
    var casosRevisao
    if ($(document).find('#casos-em-revisao').is(':checked')) {
        casosRevisao = "Sim"
    } else {
        casosRevisao = "Não"
    }
    
    var casosTranscricao
    if ($(document).find('#casos-em-transcricao').is(':checked')) {
        casosTranscricao = "Sim"
    } else {
        casosTranscricao = "Não"
    }

    var casosAprovacao
    if ($(document).find('#casos-em-aprovacao').is(':checked')) {
        casosAprovacao = "Sim"
    } else {
        casosAprovacao = "Não"
    }
    

    var valuesEscritorio = Array.from($("#escritorios").find(':selected')).map(function(item){
        return $(item).text();
    });

    var valuesCategorias = Array.from($("#categorias").find(':selected')).map(function(item){
        var optgroup = $(item).parent().attr('label');

        let finalString = optgroup+": "+$(item).text();
        console.log(finalString)
        return finalString

    });


    let dataPrevista = document.getElementById("data-prevista").value
    let dataResultado = document.getElementById("data-resultado").value
    let nomeCategoria = document.getElementById("nome-categoria").value
    let responsaveis = document.getElementById("responsaveis").value
    let submissao = document.getElementById("submissao").value
    let status = document.getElementById("status").value 

    const Swal = require('sweetalert2')
    if(document.getElementById('todos').checked) {
        
        let x = document.getElementById('escritorios')

        let array3 = []
        for (var i = 0; i < x.length; i++) {
            array3.push(x[i].text)
        }

        var filtered = array3.filter(n => n)

        console.log(filtered)
        const { execFile } = require('child_process');
    
        var exePath = path.resolve(__dirname+"../../../../engine/editar-dado/dist/main/", './main.exe')
        console.log(exePath)
        const child = execFile(exePath, ["salvar-dados", valuesCategorias[0], nomeCategoria, dataPrevista, dataResultado, responsaveis, submissao, status, filtered, casosAndamento, casosRevisao, casosTranscricao, casosAprovacao] ,(error, stdout, stderr) => {
            if (error) {
            throw error;
            }
            var results = stdout;
            Swal.fire('Registros editados!', '', 'success')
        })
    }
    else{
        console.log(valuesEscritorio)
        var exePath = path.resolve(__dirname+"../../../../engine/editar-dado/dist/main/", './main.exe')
        console.log(exePath)
        const child = execFile(exePath, ["salvar-dados", valuesCategorias[0], nomeCategoria, dataPrevista, dataResultado, responsaveis, submissao, status, valuesEscritorio, casosAndamento, casosRevisao, casosTranscricao, casosAprovacao] ,(error, stdout, stderr) => {
            if (error) {
            throw error;
            }
            var results = stdout;
            Swal.fire('Registro editado!', '', 'success')
        })
    }
}

function criarGraficos(){
    const { execFile } = require('child_process');
    var exePath = path.resolve(__dirname+"../../../../engine/dashboard/dist/main/", './main.exe')
    console.log(exePath)
    const child = execFile(exePath,(error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        var results = stdout;
        console.log(results)
        //console.log(JSON.parse(results))
        //console.log(results[0])
        let json = JSON.parse(results)

                // Builds the HTML Table out of myList.
        var myList = [json['responsaveis']]
        console.log(myList)
            // Builds the HTML Table out of myList.
        function buildHtmlTable(selector) {
            Object.keys(myList[0]).forEach(function(key) {
                console.log(key, String(myList[0][key]));
                //$(selector).find('tbody').append('<tr>')
                $(selector).find('tbody').append('<tr><td>'+key+'</td>'+'<td>'+myList[0][key]+'</td></tr>');

                //$(selector).find('tbody').append('<td>'+myList[0][key]+'</td></tr>');
                //$(selector).find('tbody').append('</tr>')
            });

        }
                

        buildHtmlTable('#tabela')

            
        var andamento1 = new ProgressBar.Circle(andamento, {
            color: '#aaa',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: false
            },
            from: { color: '#aaa', width: 1 },
            to: { color: '#333', width: 4 },
            // Set default step function for all animate calls
            step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);
          
              var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('Nenhum Caso');
            } else {
                circle.setText(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao);
            }
            circle.text.style.color = state.color;
            }
        });
        andamento1.text.style.fontSize = '2.8rem';

        if(eval(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao).toFixed(1) <= 1.0){
            console.log(String(eval(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao).toFixed(1) <= 1.0))
            andamento1.animate(eval(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao).toFixed(1));
        }
        else{
            console.log(String(eval(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao).toFixed(1) <= 1.0))
            andamento1.animate(1.0);
        }
        $('#span_andamento').empty()
        $('#span_andamento').append((eval(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao)*100).toFixed(0)+"%")
        

        var revisao1 = new ProgressBar.Circle(revisao, {
            color: '#aaa',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: false
            },
            from: { color: '#aaa', width: 1 },
            to: { color: '#333', width: 4 },
            // Set default step function for all animate calls
            step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);
          
              var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('Nenhum Caso');
            } else {
                circle.setText(json['casos-revisao'].sim+"/"+json['casos-revisao'].nao);
            }
            circle.text.style.color = state.color;
            }
        });
        revisao1.text.style.fontSize = '2.8rem';
        
        if(eval(json['casos-revisao'].sim+"/"+json['casos-revisao'].nao).toFixed(1) <= 1.0){
            revisao1.animate(eval(json['casos-revisao'].sim+"/"+json['casos-revisao'].nao).toFixed(1));
        }
        else{
            revisao1.animate(1.0);
        }
        $('#span_revisao').empty()
        $('#span_revisao').append((eval(json['casos-revisao'].sim+"/"+json['casos-revisao'].nao)*100).toFixed(0)+"%")

        
        var transcricao1 = new ProgressBar.Circle(transcricao, {
            color: '#aaa',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: false
            },
            from: { color: '#aaa', width: 1 },
            to: { color: '#333', width: 4 },
            // Set default step function for all animate calls
            step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);
          
              var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('Nenhum Caso');
            } else {
                circle.setText(json['casos-transcricao'].sim+"/"+json['casos-transcricao'].nao);
            }
            circle.text.style.color = state.color;
            }
        });
        transcricao1.text.style.fontSize = '2.8rem';
        if(eval(json['casos-transcricao'].sim+"/"+json['casos-transcricao'].nao).toFixed(1) <= 1.0){
            transcricao1.animate(eval(json['casos-transcricao'].sim+"/"+json['casos-transcricao'].nao).toFixed(1));  // Number from 0.0 to 1.0
        }
        else{
            transcricao1.animate(1.0);  // Number from 0.0 to 1.0
        }
        $('#span_transcricao').empty()
        $('#span_transcricao').append((eval(json['casos-transcricao'].sim+"/"+json['casos-transcricao'].nao)*100).toFixed(0)+"%")
        

        
        var aprovacao1 = new ProgressBar.Circle(aprovacao, {
            color: '#aaa',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: false
            },
            from: { color: '#aaa', width: 1 },
            to: { color: '#333', width: 4 },
            // Set default step function for all animate calls
            step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);
          
              var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('Nenhum Caso');
            } else {
                circle.setText(json['casos-aprovacao'].sim+"/"+json['casos-aprovacao'].nao);
            }
            circle.text.style.color = state.color;
            }
        });
        aprovacao1.text.style.fontSize = '2.8rem';

        if(eval(json['casos-aprovacao'].sim+"/"+json['casos-aprovacao'].nao).toFixed(1) <= 1.0){
            aprovacao1.animate(eval(json['casos-aprovacao'].sim+"/"+json['casos-aprovacao'].nao).toFixed(1));  // Number from 0.0 to 1.0
        }
        else{
            aprovacao1.animate(1.0);  // Number from 0.0 to 1.0
        }
        $('#span_aprovacao').empty()
        $('#span_aprovacao').append((eval(json['casos-aprovacao'].sim+"/"+json['casos-aprovacao'].nao)*100).toFixed(0)+"%")
        
          // Number from 0.0 to 1.0

        })

}