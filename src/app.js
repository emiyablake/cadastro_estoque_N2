const express = require('express')
const app = express()
const port = 3000

//converter dados que chegam no POST para JSON
app.use(express.json());

//Arrays
const materiais = [];


//Listar materiais 
app.get('/materiais',(req, res) => {
    res.json(materiais)
})

//Criar materiais
app.post('/materiais',(req, res) => {

    const {nome, qtde} = req.body.materiais;
    const id = materiais.length;

    materiais.push({
        nome,
        qtde,
        id
    });

    res.status(201).json({message: 'Material adicionado com sucesso'})
})


//Buscar pelo ID
app.get('/materiais/:id',(req, res) => {
    const IDmaterial = req.params.id

    const material = materiais[IDmaterial]
    
    res.json(material);
})

//Alterar pelo ID
app.put('/materiais/:id', (req, res) => {
    const IDmaterial = req.params.id
    //console.log('ID do material:', IDmaterial);

    const newMaterial = req.body
    //console.log('Novos dados:', newMaterial);

    materiais[IDmaterial].nome = newMaterial.nome
    materiais[IDmaterial].qtde = newMaterial.qtde
    //console.log('Materiais atualizados:', materiais)

    res.status(200).json({message: 'Alteração bem-sucedia'})
})

//Remover pelo ID
app.delete('/materiais/:id', (req, res) => {
    const IDmaterial = req.params.id 

    //deleta o material com o ID especifico
    materiais.splice(IDmaterial,1);

    //atuala o id dos materiais restantes na lista
    materiais.forEach((material, id) => {
        material.id = id;
    });

    //retorna a lista atualizada
    res.status(200).json(materiais);
})

app.listen(port,() => {
    console.log('Câmbio, tem alguem ouvindo na porta ' + port, '?');
});
