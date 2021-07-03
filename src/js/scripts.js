// usado para mandar coisas do main pra ca e visse versa
const { ipcRenderer} = require('electron')

let {PythonShell} = require('python-shell')
var path = require("path")


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

        let finalString = optgroup+":"+$(item).text();
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

        let finalString = optgroup+":"+$(item).text();
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
        formated = results[0].replace('[','')
        formated = formated.replace(']','')
        formated = formated.replace(/\\/g, '');
        formated = formated.replace(/\]/g, '');
        formated = formated.replace(/\[/g, '');
        formated = formated.replace(/'/g,'')
        //formated = formated.replace(/\s/g,'')

        let array2 = formated.split(',')

        for(let i = 0; i<array2.length;i++){
            console.log(typeof array2[i])
        }

        document.getElementById("data-prevista").value = array2[3].replace(/\"/g, '');
        document.getElementById("data-resultado").value = array2[5].replace(/\"/g, '');
        document.getElementById("nome-categoria").value = array2[2].replace(/\"/g, '');
        document.getElementById("responsaveis").value = array2[6].replace(/\"/g, '');
        document.getElementById("submissao").value = array2[7].replace(/\"/g, '');
        document.getElementById("status").value = array2[8].replace(/\"/g, '');


    })
}