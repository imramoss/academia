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
