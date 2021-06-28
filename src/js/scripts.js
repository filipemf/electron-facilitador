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

    

    // pyshell.on('message', function(message){
        
    //     document.getElementById('label_resultado').innerHTML = message
    // })
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
// const textarea = document.getElementById('text')
// const title = document.getElementById('titles')

// ipcRenderer.on('set-file', function(event, data){
//     textarea.value = data.content;
//     title.innerHTML = data.name+ ' | DEV'
// })

// function handleChangeText(){
//     options = [{
//         data: "um",
//         date: "dois"
//     }]
//     ipcRenderer.send('update-content', options[0].data)
// }