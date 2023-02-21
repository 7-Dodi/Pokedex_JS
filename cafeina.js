//Selecionando os elementos de interação com o usuário
const nomePokemon = document.querySelector("#pokemonName");
const imagemPokemon = document.querySelector("#pokemonImg");

//Selecionando os elementos do formulário
const inputPokemon = document.querySelector("#form");
const inputName = document.querySelector("#inputName");

//Selecionando os buttons de interação
const buttonNext = document.querySelector("#next");
const buttonPrev = document.querySelector("#prev");

//Variável de controle da posição do pokemon
let numberPokemon = 1;

//Função assicrona para importar os dados do pokemon selecionado
const fetchPokemon = async (pokemon) =>{
    const APIresponde = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //Await usado garantir que o dado seja pesquisado
    if(APIresponde.status === 200){ //Garantindo que não tennha nenhum erro na pesquisa dos dados
        const data = await APIresponde.json();//Transformando os dados em json
        return data;
    }
}

//Função para carregar os dados dos pokemons
const rederPokemon = async (pokemon) => {
    nomePokemon.innerHTML = `<span>-</span> Loading...`; //Carregando as pesquisas dos dados

    //Constante que armazena os dados do pokemon
    const poke = await fetchPokemon(pokemon);

    if(poke){ //Caso a constatante tenha dados
        nomePokemon.innerHTML = `<span>${poke.id}</span>- ${poke.name}`; //Imprimindo os dados
        //Atualizando a imagem
        imagemPokemon.setAttribute("src", `https://raw.githubusercontent.com/PokeAPi/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${poke.id}.gif`);
        numberPokemon = poke.id; //Atualizando o valor da variável, com o id do pokemon
        inputName.value = "";//Zerando o campo do Input
    }
    else{ //Caso não tenha dados do Pokemon
        nomePokemon.innerHTML = `<span>-</span> Not Found`;
        imagemPokemon.setAttribute("src", "");
    }
}

//Campo input do Pokemon
inputPokemon.addEventListener("submit", (event)=>{
    event.preventDefault();//Evitando erros
    rederPokemon(inputName.value.toLowerCase());//Enviando o dado para a função de pesquisar o pokemon
});

//Button para passar para o proximo Pokemon
buttonNext.addEventListener("click", ()=>{
    numberPokemon +=1;
    rederPokemon(numberPokemon);
});

//Button para retornar para o pokemon anterior
buttonPrev.addEventListener("click", ()=>{
    if(numberPokemon > 1){
        numberPokemon -=1;
        rederPokemon(numberPokemon);
    }
});

//Atualizar a página sempre com o primeiro pokemon do API
window.addEventListener("load", ()=>{
    rederPokemon(numberPokemon);
});

