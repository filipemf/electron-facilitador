// usado para mandar coisas do main pra ca e visse versa
const { ipcRenderer} = require('electron')

let {PythonShell} = require('python-shell')
var path = require("path")
var ProgressBar = require('progressbar.js')

function buscarMes(){
    
    const mes = document.getElementById('mes').value
    const ano = document.getElementById('ano').value

    var $ = jQuery = require("jquery")



    if(document.getElementById('prevista').checked) {
        var prevista = "prevista"
        //Male radio button is checked
        var options = {
            scriptPath: path.join(__dirname,'../../engine/consulta-mes/'),
            args: [mes, ano, prevista]
        }

        PythonShell.run('main.py', options, function(err, results){
            if (err) throw err;
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

    }else if(document.getElementById('resultado').checked) {
        var resultado = "resultado"
        //Female radio button is checked
        var options = {
            scriptPath: path.join(__dirname,'../../engine/consulta-mes/'),
            args: [mes, ano, resultado]
        }

        PythonShell.run('main.py', options, function(err, results){
            if (err) throw err;
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

function buscarResponsaveis(){

    const responsavel = document.getElementById('responsaveis').value
    console.log(responsavel)

    var options = {
        enconding: 'ISO-8859-1',
        scriptPath: path.join(__dirname,'../../engine/consulta-responsaveis/'),
        args: [responsavel],
        enconding: "latin1"
    }

    console.log(options.scriptPath)
    PythonShell.run('main.py', options, function(err, results){
        if (err) throw err;

        
        console.log(results)
        
        //console.log(str);
        

        
        

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

function buscarEscritorios(){
    var valuesEscritorios =Array.from($("#escritorios").find(':selected')).map(function(item){
        return $(item).text();
    });

    var valuesInstituicoes =Array.from($("#instituicoes").find(':selected')).map(function(item){
        return $(item).text();
    });
    
    var options = {
        scriptPath: path.join(__dirname,'../../engine/consulta-escritorio/'),
        args: [valuesEscritorios, valuesInstituicoes]
    }

    PythonShell.run('main.py', options, function(err, results){
        if (err) throw err;
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

function buscarInstituicoes(){
    var valuesEscritorios =Array.from($("#escritorios").find(':selected')).map(function(item){
        return $(item).text();
    });

    var valuesInstituicoes =Array.from($("#instituicoes").find(':selected')).map(function(item){
        return $(item).text();
    });
    
    var valuesCategorias = Array.from($("#categorias").find(':selected')).map(function(item){
        return $(item).text();
    });
    
    
    var options = {
        scriptPath: path.join(__dirname,'../../engine/consulta-instituicao/'),
        args: [valuesEscritorios, valuesInstituicoes, valuesCategorias]
    }

    PythonShell.run('main.py', options, function(err, results){
        if (err) throw err;
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

function incluirDado(){
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
    
    
    var options = {
        scriptPath: path.join(__dirname,'../../engine/incluir-dado/'),
        args: [valuesEscritorios, valuesInstituicoes, responsavel, nomeCategoria, submissao, status, dataPrevista, dataResultado]
    }

    PythonShell.run('main.py', options, function(err, results){
        if (err) throw err;
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

function buscaComplexa(){
    var valuesEscritorios =Array.from($("#escritorios").find(':selected')).map(function(item){
        return $(item).text();
    });

    var valuesInstituicoes = Array.from($("#instituicoes").find(':selected')).map(function(item){
        return $(item).text();
    });
    
    const responsavel = document.getElementById('responsaveis').value


    const submissao = document.getElementById('submissao').value

    const status = document.getElementById('status').value

    const mes = document.getElementById('mes').value
    const ano = document.getElementById('ano').value
    
    if(document.getElementById('prevista').checked) {
        var prevista = "previsao"

        var options = {
            scriptPath: path.join(__dirname,'../../engine/consulta-complexa/'),
            args: [valuesEscritorios, valuesInstituicoes, responsavel, "nomeCategoria", submissao, status, mes, ano, prevista]
        }

        
        PythonShell.run('main.py', options, function(err, results){
            if (err) throw err;
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

    }else if(document.getElementById('resultado').checked) {
        var resultado = "resultado"

        var options = {
            scriptPath: path.join(__dirname,'../../engine/incluir-dado/'),
            args: [valuesEscritorios, valuesInstituicoes, responsavel, "nomeCategoria", submissao, status, mes, ano, resultado]
        }

        
        PythonShell.run('main.py', options, function(err, results){
            if (err) throw err;
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

function checarEscritorios(){
    var valuesCategorias = Array.from($("#categorias").find(':selected')).map(function(item){
        var optgroup = $(item).parent().attr('label');

        let finalString = optgroup+": "+$(item).text();
        console.log(finalString)
        return finalString

    });

    
    var options = {
        scriptPath: path.join(__dirname,'../../engine/editar-dado/'),
        args: ["checar-escritorios", valuesCategorias]
    }

    
    PythonShell.run('main.py', options, function(err, results){
        if (err) throw err;
        formated = results[0].replace('[','')
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

    
    var options = {
        scriptPath: path.join(__dirname,'../../engine/editar-dado/'),
        args: ["buscar-dados", valuesCategorias, valuesEscritorio]
    }

    
    PythonShell.run('main.py', options, function(err, results){
        if (err) throw err;
        console.log(results)
        formated = results[0].replace('[','')
        formated = formated.replace(']','')
        formated = formated.replace(/\\/g, '');
        formated = formated.replace(/\]/g, '');
        formated = formated.replace(/\[/g, '');
        formated = formated.replace(/'/g,'')
        //formated = formated.replace(/\s/g,'')

        let array2 = formated.split(',')

        // for(let i = 0; i<array2.length;i++){
        //     console.log(array2[i])
        // }

        document.getElementById("data-prevista").value = array2[3].replace(/\"/g, '');
        document.getElementById("data-resultado").value = array2[5].replace(/\"/g, '');
        document.getElementById("nome-categoria").value = array2[2].replace(/\"/g, '');
        document.getElementById("responsaveis").value = array2[6].replace(/\"/g, '');
        document.getElementById("submissao").value = array2[7].replace(/\"/g, '');
        document.getElementById("status").value = array2[8].replace(/\"/g, '');


    })
}


function pegarTodosEscritorios(){
    var valuesCategorias = Array.from($("#categorias").find(':selected')).map(function(item){
        var optgroup = $(item).parent().attr('label');

        let finalString = optgroup+": "+$(item).text();
        console.log(finalString)
        return finalString

    });

    
    var options = {
        scriptPath: path.join(__dirname,'../../engine/editar-dado/'),
        args: ["checar-escritorios", valuesCategorias]
    }

    
    PythonShell.run('main.py', options, function(err, results){
        if (err) throw err;
        formated = results[0].replace('[','')
        formated = formated.replace(']','')
        formated = formated.replace(/'/g,'')
        formated = formated.replace(/\s/g,'')

        let array2 = formated.split(',')
        
        return array2

    })
}

function salvarDadosEditados(){
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

    if(document.getElementById('todos').checked) {
        
        let x = document.getElementById('escritorios')

        let array3 = []
        for (var i = 0; i < x.length; i++) {
            array3.push(x[i].text)
        }

        var filtered = array3.filter(n => n)

        console.log(filtered)
        var options = {
            scriptPath: path.join(__dirname,'../../engine/editar-dado/'),
            args: ["salvar-dados", valuesCategorias[0], nomeCategoria, dataPrevista, dataResultado, responsaveis, submissao, status, filtered]
        }
        PythonShell.run('main.py', options, function(err, results){
            console.log(results)
        })
    }
    else{
        console.log(valuesEscritorio)
        var options = {
            scriptPath: path.join(__dirname,'../../engine/editar-dado/'),
            args: ["salvar-dados", valuesCategorias[0], nomeCategoria, dataPrevista, dataResultado, responsaveis, submissao, status, valuesEscritorio]
        }
        PythonShell.run('main.py', options, function(err, results){
            console.log(results)
        })
    }
}

function criarGraficos(){
    var optionsAn = {
        scriptPath: path.join(__dirname,'../../engine/dashboard/'),
    }
    PythonShell.run('main.py', optionsAn, function(err, results){
        if (err) throw err;
        //console.log(JSON.parse(results))
        //console.log(results[0])
        let json = JSON.parse(results)
        console.log(json)
        console.log([json['responsaveis']])

                // Builds the HTML Table out of myList.
            var myList = [json['responsaveis']]
            console.log(myList)
                
                // Builds the HTML Table out of myList.
                function buildHtmlTable(selector) {
                var columns = addAllColumnHeaders(myList, selector);
                
                for (var i = 0; i < myList.length; i++) {
                    var row$ = $('<tr/>');
                    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                    var cellValue = myList[i][columns[colIndex]];
                    if (cellValue == null) cellValue = "";
                    row$.append($('<td/>').html(cellValue));
                    }
                    $(selector).append(row$);
                }
                }
                
                // Adds a header row to the table and returns the set of columns.
                // Need to do union of keys from all records as some records may not contain
                // all records.
                function addAllColumnHeaders(myList, selector) {
                var columnSet = [];
                var headerTr$ = $('<tr/>');
                
                for (var i = 0; i < myList.length; i++) {
                    var rowHash = myList[i];
                    for (var key in rowHash) {
                    if ($.inArray(key, columnSet) == -1) {
                        columnSet.push(key);
                    }
                    }
                }
                $(selector).append(headerTr$);
                
                return columnSet;
}

        buildHtmlTable('#tabela')

            
        var andamento1 = new ProgressBar.SemiCircle(andamento, {
            strokeWidth: 6,
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            svgStyle: null,
            text: {
            value: '',
            alignToBottom: false
            },
            from: {color: '#FFEA82'},
            to: {color: '#ED6A5A'},
            // Set default step function for all animate calls
            step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            var value = Math.round(bar.value() * 100);
            if (value === 0) {
                bar.setText('Nenhum Caso');
            } else {
                bar.setText(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao);
            }
            bar.text.style.color = state.color;
            }
        });
        andamento1.text.style.fontSize = '2.8rem';

        if(eval(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao).toFixed(0) <= 1.0){
            andamento1.animate(eval(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao).toFixed(0));
        }
        else{
            andamento1.animate(1.0);
        }
        $('#span_andamento').empty()
        $('#span_andamento').append((eval(json['casos-andamento'].sim+"/"+json['casos-andamento'].nao)*100).toFixed(0)+"%")
        

        var revisao1 = new ProgressBar.SemiCircle(revisao, {
            strokeWidth: 6,
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            svgStyle: null,
            text: {
            value: '',
            alignToBottom: false
            },
            from: {color: '#FFEA82'},
            to: {color: '#ED6A5A'},
            // Set default step function for all animate calls
            step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            var value = Math.round(bar.value() * 100);
            if (value === 0) {
                bar.setText('Nenhum Caso');
            } else {
                bar.setText(json['casos-revisao'].sim+"/"+json['casos-revisao'].nao);
            }
            bar.text.style.color = state.color;
            }
        });
        revisao1.text.style.fontSize = '2.8rem';
        
        if(eval(json['casos-revisao'].sim+"/"+json['casos-revisao'].nao).toFixed(0) <= 1.0){
            revisao1.animate(eval(json['casos-revisao'].sim+"/"+json['casos-revisao'].nao).toFixed(0));
        }
        else{
            revisao1.animate(1.0);
        }
        $('#span_revisao').empty()
        $('#span_revisao').append((eval(json['casos-revisao'].sim+"/"+json['casos-revisao'].nao)*100).toFixed(0)+"%")

        
        var transcricao1 = new ProgressBar.SemiCircle(transcricao, {
            strokeWidth: 6,
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            svgStyle: null,
            text: {
            value: '',
            alignToBottom: false
            },
            from: {color: '#FFEA82'},
            to: {color: '#ED6A5A'},
            // Set default step function for all animate calls
            step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            var value = Math.round(bar.value() * 100);
            if (value === 0) {
                bar.setText('Nenhum Caso');
            } else {
                bar.setText(json['casos-transcricao'].sim+"/"+json['casos-transcricao'].nao);
            }
            bar.text.style.color = state.color;
            }
        });
        transcricao1.text.style.fontSize = '2.8rem';
        if(eval(json['casos-transcricao'].sim+"/"+json['casos-transcricao'].nao).toFixed(0) <= 1.0){
            transcricao1.animate(eval(json['casos-transcricao'].sim+"/"+json['casos-transcricao'].nao).toFixed(0));  // Number from 0.0 to 1.0
        }
        else{
            transcricao1.animate(1.0);  // Number from 0.0 to 1.0
        }
        $('#span_transcricao').empty()
        $('#span_transcricao').append((eval(json['casos-transcricao'].sim+"/"+json['casos-transcricao'].nao)*100).toFixed(0)+"%")
        

        
        var aprovacao1 = new ProgressBar.SemiCircle(aprovacao, {
            strokeWidth: 6,
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            svgStyle: null,
            text: {
            value: '',
            alignToBottom: false
            },
            from: {color: '#FFEA82'},
            to: {color: '#ED6A5A'},
            // Set default step function for all animate calls
            step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
            var value = Math.round(bar.value() * 100);
            if (value === 0) {
                bar.setText('Nenhum Caso');
            } else {
                bar.setText(json['casos-aprovacao'].sim+"/"+json['casos-aprovacao'].nao);
            }
            bar.text.style.color = state.color;
            }
        });
        aprovacao1.text.style.fontSize = '2.8rem';

        if(eval(json['casos-aprovacao'].sim+"/"+json['casos-aprovacao'].nao).toFixed(0) <= 1.0){
            aprovacao1.animate(eval(json['casos-aprovacao'].sim+"/"+json['casos-aprovacao'].nao).toFixed(0));  // Number from 0.0 to 1.0
        }
        else{
            aprovacao1.animate(1.0);  // Number from 0.0 to 1.0
        }
        $('#span_aprovacao').empty()
        $('#span_aprovacao').append((eval(json['casos-aprovacao'].sim+"/"+json['casos-aprovacao'].nao)*100).toFixed(0)+"%")
        
          // Number from 0.0 to 1.0

        })

}