import { fetchData } from '/js/api/api.js';
import { setDiscount } from '/js/utils.js';

//카테고리 선택 렌더링
const teamSelectBox = document.querySelector('.select.team select');
const updateTeamOptions = async () => {
  const teams = await fetchData('/teams');
  const options = teams
    .map(team => `<option value=${team.teamId}>${team.teamName}</option>`)
    .join('');
  teamSelectBox.innerHTML = `<option selected>팀 전체</option>${options}`;
};
await updateTeamOptions();

const categorySelectBox = document.querySelector('.select.category select');
const updateCategoryOptions = async teamId => {
  const categories = await fetchData(`/teams/${teamId}/categories`);
  const options = categories
    .map(category => `<option>${category.categoryName}</option>`)
    .join('');
  categorySelectBox.innerHTML = `<option selected>카테고리 전체</option>${options}`;
};

teamSelectBox.addEventListener('input', async () => {
  const teamId = teamSelectBox.value;
  await updateCategoryOptions(teamId);
});

const priceInput = document.querySelector('.price');
const rateInput = document.querySelector('.rate');

const discountedPriceInput = document.querySelector('.discounted-price');

function renderDiscountedPrice() {
  const discountedPrice = setDiscount(priceInput.value, rateInput.value);
  discountedPriceInput.value = discountedPrice;
}

priceInput.addEventListener('input', renderDiscountedPrice);
rateInput.addEventListener('input', renderDiscountedPrice);

const postButton = document.querySelector('.post');
postButton.addEventListener('click', async event => {
  event.preventDefault();

  const productThumbnail = document.querySelector('.productThumbnail').files[0];
  const formData = new FormData();
});
