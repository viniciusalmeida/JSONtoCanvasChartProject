/* Ferramenta simples para a conversão de expressõe JSON para gráficos construídos 
com o elemento canvas do HTML5 */

var JSONtoCanvasChart = function (larguraCanvas, alturaCanvas) {


    /* Definição das propriedades e dos seus valores iniciais */
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        dataCollection,
        larguraGrafico = larguraCanvas,
        alturaGrafico = alturaCanvas,
        tamanhoMargem,
        propriedadesGrafico = {'backgroundColor': '#FFF',
                               'borderColor': '#000'},
        legendaDados = [],
        larguraGrid,
        alturaGrid,
        propriedadesGrid = {'backgroundColor': '#FFF',
                            'borderColor': '#CCC',
                            'tipoGrafico': 'barrasSimples',
                            'cores': ['red', 'green', 'blue', 'yellow']};


    function load() {
        /* Método pseudo-construtor
        Define o tamanho do gráfico/canvas e o contexto do canvas.
        Aqui já começamos a desenhar nosso gráfico.*/
        canvas.setAttribute('width', larguraGrafico);
        canvas.setAttribute('height', alturaGrafico);
        desenhaRect(propriedadesGrafico.backgroundColor, 0, 0, 
                    larguraGrafico, alturaGrafico, propriedadesGrafico.borderColor);
    }


    /* Chamada ao pseudo-construtor */
    load();


    function desenhaRect (corPreenchimento, posicaoX, posicaoY, 
                          largura, altura, corContorno) {
        /* Método que abstrai o desenho de retangulos no canvas.
        A cor do contorno é opcional. Se ela não for setada o retangulo é desenhado sem bordas. */
        context.fillStyle = corPreenchimento;
        context.fillRect(posicaoX, posicaoY, largura, altura);
        if (corContorno !== undefined) {
            context.strokeStyle = corContorno;
            context.lineWidth = 1;
            context.strokeRect(posicaoX, posicaoY, largura, altura)
        }
    }


    function setGrid() {
        /* Método que define as proporções da margem interna entre a borda do gráfico e
        e o grid. Por padrão, é utilizado um décimo da menor medida entre altura e largura */
        if (larguraGrafico < alturaGrafico) {
            tamanhoMargem = Math.round(larguraGrafico - (larguraGrafico * 0.9));
        } else {
            tamanhoMargem = Math.round(alturaGrafico - (alturaGrafico * 0.9));
        }

        larguraGrid = larguraGrafico - Math.round(tamanhoMargem * 2);
        alturaGrid = alturaGrafico - Math.round(tamanhoMargem * 2);
        desenhaRect(propriedadesGrid.backgroundColor, tamanhoMargem, tamanhoMargem, 
                    larguraGrid, alturaGrid, propriedadesGrid.borderColor);
    }


    function invocaGrafico() {
        /* Método que valida qual o tipo de gráfico que está setado nas propriedades e 
        invoca o método responsável pela renderização do mesmo. */
        switch (propriedadesGrid.tipoGrafico) {
            case 'barrasSimples':
                desenhaBarrasSimples();
                break;
            case 'linhasSimples':
                desenhaLinhasSimples();
                break;
        }
    }


    function desenhaBarrasSimples () {
        /* Método responsável pelo desenho do gráfico de barras simples
        sem valores negativos (por enquento). 
        Ele basicamente percorre os dados a serem incluídos no gráfico e efetua os
        cálculos nescessários para desenhar o gráfico nas proporções adequadas.
        - A largura das barras está sendo dividida por 2 para possibilitar um 
        distanciamento entre as barras do mesmo tamanho da largura das mesmas.
        - O iterador utilizado no for que faz o desenho do gráfico em sí inicia
        em 0.25 pois é um valor inicial que, nos calculos de posicionamento dos
        elementos, posiciona a primeira barra na distância exata da margem esquerda. */
        var numeroBarras = dataCollection.length,
            larguraBarra = Math.round((larguraGrid / numeroBarras) / 2),
            maiorValorDaCollection = 0,
            proporcaoDistanciaHorizontal = 0.25;
        /* Percorre os valores da collection de dados buscando o maior para utilizar
        como referência do tamanho das barras do gráfico. */
        for (var i = 0; i < numeroBarras; i++) {
            if (dataCollection[i].valor > maiorValorDaCollection) {
                maiorValorDaCollection = dataCollection[i].valor;
            }
        }
        /* Percorre os dados da collection para desenhar efetivamente o gráfico. */        
        for (var i = 0; i < numeroBarras; i++) {
            var alturaBarra = ((dataCollection[i].valor / maiorValorDaCollection) * alturaGrid) - 2;
            var distanciaXbarra = tamanhoMargem + (larguraBarra * proporcaoDistanciaHorizontal) * 2;
            var distanciaYbarra = (tamanhoMargem - 1) + (alturaGrid - alturaBarra);
            var distanciaXvalorBarra = distanciaXbarra + (larguraBarra / 2);
            var distanciaYvalorBarra = distanciaYbarra + 15;
            if (dataCollection[i].colorBar === undefined) {    
                var corBarra = propriedadesGrid.cores.shift();
                propriedadesGrid.cores.push(corBarra);
            } else {
                var corBarra = dataCollection[i].colorBar;
            }
            proporcaoDistanciaHorizontal = proporcaoDistanciaHorizontal + 1;
            desenhaRect(corBarra, distanciaXbarra, distanciaYbarra, 
                        larguraBarra, alturaBarra);
            legendaDados.push([corBarra, dataCollection[i].rotulo])
            context.fillStyle = '#000';
            context.textAlign = 'center';
            context.fillText(dataCollection[i].valor, distanciaXvalorBarra, distanciaYvalorBarra);
        }
    }


    function desenhaLinhasSimples() {
        /* Método responsável pelo desenho do gráfico de barras simples
        sem valores negativos (por enquento).
        Basicamente percorre os dados a serem incluídos no gráfico e efetua os cálculos 
        nescessários para desenhar o gráfico nas proporções adequadas.
        OBS: No = Nó */
        var maiorValorDaCollection = 0,
            numeroValores = dataCollection[0].valores.length,
            distanciaHorizontalNos = (larguraGrid / (numeroValores - 1)),
            iteradorValores;
        /* Percorre o dataCollection tentando identificar o maior valor. Esse valor
        é utilizado como referência para o desenho do gráfico */
        for (var i = 0; i < dataCollection.length; i++) {
            for (iteradorValores in dataCollection[i].valores) {
                if (dataCollection[i].valores[iteradorValores] > maiorValorDaCollection) {
                    maiorValorDaCollection = dataCollection[i].valores[iteradorValores];
                }
            }
        }
        /* Percorre os dados da collection para desenhar efetivamente o gráfico. */
        for (var i = 0; i < dataCollection.length; i++) {
            var corLinha = propriedadesGrid.cores.shift();
            propriedadesGrid.cores.push(corLinha);
            context.lineWidth = 4;
            context.strokeStyle = corLinha;
            context.beginPath();
            for (iteradorValores in dataCollection[i].valores) {
                var alturaNo = Math.round((dataCollection[i].valores[iteradorValores] / maiorValorDaCollection) * alturaGrid);
                distanciaXNo = (iteradorValores * distanciaHorizontalNos) + tamanhoMargem;
                distanciaYNo = (alturaGrid - alturaNo) + tamanhoMargem;
                if (iteradorValores == 0) {
                    context.moveTo(distanciaXNo, distanciaYNo);
                } else {
                    context.lineTo(distanciaXNo, distanciaYNo);
                }
            }
            context.stroke();
        }
    }


    return {

        show: function (idContainer) {
            /* Método que desencadeia todo o processamento da renderização dos gráficos.
            Recebe no parâmetro o identificador do elemento que receberá o gráfico. */
            document.getElementById(idContainer).appendChild(canvas);
            setGrid();
            invocaGrafico();
        },


        setDataCollection: function (collection) {
            /* Método setter da collection de dados que serão usados nos gráficos.
            Ao ser invocado já converte a notação JSON. */
            dataCollection = JSON.parse(collection);
        },


        setPropriedadesGrid: function (newPropertiesObject) {
            /* Método setter das propriedades básicas.
            Ele trabalha de uma forma bem inteligente validando a existência das propriedades */
            var property,
                existingProperty;
            for (property in newPropertiesObject) {
                existingProperty = propriedadesGrid.hasOwnProperty(property);
                if (existingProperty) {
                    propriedadesGrid[property] = newPropertiesObject[property]; 
                }
            }
        }

    };

};
