var bilheteria = [];
bilheteria.push({'rotulo': 'Pulp Fiction', 'valor': 107});
bilheteria.push({'rotulo': 'Karatê Kid', 'valor': 268});
bilheteria.push({'rotulo': 'outro', 'valor': 190});
bilheteria.push({'rotulo': 'outro', 'valor': 210});
bilheteria = JSON.stringify(bilheteria);

var producao = [];
producao.push({'rotulo': 'linha1', 'valores': [107, 268, 190, 210]});
producao.push({'rotulo': 'linha2', 'valores': [90, 200, 120, 200]});
producao.push({'rotulo': 'linha3', 'valores': [190, 150, 90, 60]});
producao = JSON.stringify(producao);