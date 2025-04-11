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
  const carrinhoEl = document.getElementById("carrinho");
  carrinhoEl.style.display =
    carrinhoEl.style.display === "none" ? "block" : "none";
}

function pagar() {
  alert("Pagamento realizado com sucesso!");
  carrinho = [];
  atualizarCarrinho();
}

function verDetalhes(produto) {
  alert("Detalhes do produto: " + produto);
}
