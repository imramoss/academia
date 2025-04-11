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
