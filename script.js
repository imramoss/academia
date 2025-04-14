// Carrossel simples
let currentBanner = 0;
const banners = document.querySelectorAll(".carousel img");

function trocarBanner() {
  banners.forEach((img, i) => {
    img.style.display = i === currentBanner ? "block" : "none";
  });
  currentBanner = (currentBanner + 1) % banners.length;
}

if (banners.length) setInterval(trocarBanner, 3000);

trocarBanner();

// Carrinho
let carrinho = [];

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const container = document.getElementById("itens-carrinho");
  container.innerHTML = "";
  carrinho.forEach((item, i) => {
    const div = document.createElement("div");
    div.textContent = item + " ";
    const remover = document.createElement("button");
    remover.textContent = "Remover";
    remover.onclick = () => {
      carrinho.splice(i, 1);
      atualizarCarrinho();
    };
    div.appendChild(remover);
    container.appendChild(div);
  });
}

function toggleCart() {
  const cart = document.getElementById('carrinho');
  if (cart) {
    cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
  }
}

function verDetalhes(produto) {
  // Redireciona para uma página de produto (ajuste com base no nome se quiser fazer isso dinâmico)
  window.location.href = "produto.html";
}

function adicionarAoCarrinho(produto) {
  alert(produto + " adicionado ao carrinho!");
}

function pagar() {
  alert("Redirecionando para pagamento...");
}
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById('imgUpload');
  const preview = document.getElementById('preview');

  input.addEventListener('change', function () {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", function () {
    const termo = searchInput.value.trim();
    if (termo) {
      // Redireciona para a página de produtos com o termo como parâmetro
      window.location.href = `produtos.html?search=${encodeURIComponent(termo)}`;
    }
  });

  // Permite apertar Enter para buscar também
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchButton.click();
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const termoBusca = params.get("search");

  if (termoBusca) {
    const termoNormalizado = termoBusca.toLowerCase();
    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {
      const nome = produto.querySelector(".produto-nome").textContent.toLowerCase();
      const categoria = produto.querySelector(".produto-categoria").textContent.toLowerCase();
      const descricao = produto.querySelector(".produto-descricao").textContent.toLowerCase();

      const corresponde = nome.includes(termoNormalizado) ||
                          categoria.includes(termoNormalizado) ||
                          descricao.includes(termoNormalizado);

      produto.style.display = corresponde ? "block" : "none";
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Função para adicionar produtos ao carrinho
  function adicionarAoCarrinho(idProduto, nomeProduto, precoProduto, imagemProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produto = {
      id: idProduto,
      nome: nomeProduto,
      preco: precoProduto,
      imagem: imagemProduto,
      quantidade: 1
    };

    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(p => p.id === idProduto);

    if (produtoExistente) {
      produtoExistente.quantidade += 1; // Se sim, aumenta a quantidade
    } else {
      carrinho.push(produto); // Se não, adiciona o produto
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho(); // Atualiza o carrinho na tela
  }

  // Função para remover um item do carrinho
  function removerDoCarrinho(idProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(produto => produto.id !== idProduto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho(); // Atualiza o carrinho na tela
  }

  // Função para atualizar o carrinho na tela
  function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoContainer = document.getElementById('carrinho');
    carrinhoContainer.innerHTML = '';

    if (carrinho.length === 0) {
      carrinhoContainer.innerHTML = 'Seu carrinho está vazio.';
      return;
    }

    let total = 0;
    carrinho.forEach(item => {
      const itemCarrinho = document.createElement('div');
      itemCarrinho.classList.add('item-carrinho');
      
      itemCarrinho.innerHTML = `
        <img src="${item.imagem}" class="produto-img" alt="${item.nome}">
        <div class="detalhes-produto">
          <h4>${item.nome}</h4>
          <p>R$ ${item.preco.toFixed(2)}</p>
          <p>Quantidade: ${item.quantidade}</p>
        </div>
        <button onclick="removerDoCarrinho(${item.id})">Remover</button>
      `;

      carrinhoContainer.appendChild(itemCarrinho);
      total += item.preco * item.quantidade;
    });

    // Exibe o valor total no carrinho
    const totalContainer = document.getElementById('total');
    totalContainer.textContent = `Total: R$ ${total.toFixed(2)}`;
  }

  // Função para finalizar compra (simulação)
  function finalizarCompra() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    // Simulando um processo de pagamento
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    alert(`Compra finalizada com sucesso! Total: R$ ${total.toFixed(2)}`);

    // Limpando o carrinho após a compra
    localStorage.removeItem('carrinho');
    atualizarCarrinho();
  }

  // Função para calcular o frete (simulação)
  function calcularFrete() {
    const cep = document.getElementById('cep').value;

    if (cep.length !== 8) {
      alert('Por favor, insira um CEP válido.');
      return;
    }

    // Simulando cálculo de frete
    const valorFrete = Math.random() * 50 + 10; // Valor aleatório entre 10 e 60
    const freteContainer = document.getElementById('frete');
    freteContainer.textContent = `Frete: R$ ${valorFrete.toFixed(2)}`;
  }

  // Função de validação de cadastro
  function validarCadastro(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      alert('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    // Armazenando usuário no localStorage
    const usuario = { nome, email, senha };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Conta criada com sucesso! Faça login para continuar.');
  }

  // Função de validação de login
  function validarLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario || usuario.email !== email || usuario.senha !== senha) {
      alert('E-mail ou senha inválidos.');
      return;
    }

    alert('Login bem-sucedido! Bem-vindo de volta, ' + usuario.nome);
  }

  // Event listeners para as funções
  document.getElementById('btn-cadastro').addEventListener('click', validarCadastro);
  document.getElementById('btn-login').addEventListener('click', validarLogin);
  document.getElementById('btn-calcular-frete').addEventListener('click', calcularFrete);
  document.getElementById('btn-finalizar-compra').addEventListener('click', finalizarCompra);

  // Atualiza o carrinho quando a página for carregada
  atualizarCarrinho();
  
  // Adiciona produtos ao carrinho (exemplo)
  document.getElementById('produto-1').addEventListener('click', function() {
    adicionarAoCarrinho(1, 'Produto Exemplo', 100, 'produto1.jpg');
  });
  document.getElementById('produto-2').addEventListener('click', function() {
    adicionarAoCarrinho(2, 'Produto Exemplo 2', 150, 'produto2.jpg');
  });
});
