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

document.addEventListener('DOMContentLoaded', function () {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  function atualizarCarrinho() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
      container.innerHTML = '<p>Seu carrinho está vazio.</p>';
      return;
    }

    carrinho.forEach((produto, i) => {
      const div = document.createElement('div');
      div.classList.add('item-carrinho');

      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="detalhes-produto">
          <h4>${produto.nome}</h4>
          <p>R$ ${produto.preco.toFixed(2)}</p>
          <input type="number" min="1" value="${produto.quantidade}" data-index="${i}" class="quantidade">
        </div>
        <button class="remover" data-index="${i}">Remover</button>
      `;

      container.appendChild(div);
      total += produto.preco * produto.quantidade;
    });

    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
  }

  document.getElementById('cart-items').addEventListener('change', function (e) {
    if (e.target.classList.contains('quantidade')) {
      const i = e.target.dataset.index;
      carrinho[i].quantidade = parseInt(e.target.value);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      atualizarCarrinho();
    }
  });

  document.getElementById('cart-items').addEventListener('click', function (e) {
    if (e.target.classList.contains('remover')) {
      const i = e.target.dataset.index;
      carrinho.splice(i, 1);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      atualizarCarrinho();
    }
  });

  document.getElementById('btn-finalizar-compra').addEventListener('click', function () {
    if (carrinho.length === 0) return alert('Carrinho vazio!');
    const total = carrinho.reduce((soma, p) => soma + p.preco * p.quantidade, 0);
    alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}`);
    localStorage.removeItem('carrinho');
    carrinho = [];
    atualizarCarrinho();
  });

  window.calcularFrete = function () {
    const cep = document.getElementById('cep').value;
    if (cep.length !== 8) return alert("CEP inválido.");
    const frete = (Math.random() * 30 + 10).toFixed(2);
    document.getElementById('frete').textContent = `Frete: R$ ${frete}`;
  };

  atualizarCarrinho();
});


    // Exibe o valor total no carrinho
    const totalContainer = document.getElementById('total');
    totalContainer.textContent = `Total: R$ ${total.toFixed(2)}`;


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
