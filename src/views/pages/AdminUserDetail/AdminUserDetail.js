import { $, $createElement, getCookie } from '/js/utils.js';
import { getAuthOption } from '/js/api/authAPI.js';

const render = async () => {
  const userEmail = location.pathname.split('/')[3];
  const userInfo = await fetch(
    `/api/v1/users/${userEmail}`,
    getAuthOption()
  ).then((res) => res.json());
  console.log(userInfo);

  //   const {
  //     address: { detailAddress, postCode, roughAddress },
  //     cheerTeam: { teamId, teamName },
  //     createdAt,
  //     email,
  //     koreanName,
  //     phoneNumber,
  //     updatedAt,
  //   } = userInfo;

  const managementContainer = $('.management-container');
  const userUpdateForm = $createElement('form', 'update-form');
  userUpdateForm.innerHTML = `
  <form class="update-form">
  <h4 class="title is-4">회원 정보 수정</h4>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">이메일</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="email"
            class="input user-email"
            type="text"
            placeholder="이메일을 입력해 주세요."
            autocomplete="off"
          />
          <p class="email-warning hidden">이메일 형식이 올바르지 않습니다.</p>
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">이름</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="koreanName"
            class="input user-name"
            type="text"
            placeholder="이름을 입력해 주세요."
            required
            autocomplete="off"
          />
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">휴대전화</label>
    </div>
    <div class="field-body">
      <p class="control">
        <span class="select">
          <select class="user-phone-number-pro" id="firstPhoneNumber">
            <option>010</option>
            <option>011</option>
            <option>016</option>
            <option>017</option>
            <option>018</option>
            <option>019</option>
          </select>
        </span>
      </p>
      <div class="field phone-number">
        <p class="control is-expanded">
          <input
            id="phoneNumber"
            class="input user-phone-number-back"
            type="tel"
            placeholder="나머지 번호를 입력해주세요."
            maxlength="9"
            required
            autocomplete="off"
          />
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">주소</label>
    </div>
    <div class="field-body">
      <div class="field zipcode">
        <p class="control is-expanded">
          <input
            id="postCode"
            class="input address address-zonecode"
            type="text"
            placeholder="우편번호"
            readonly
            onfocus="this.blur()"
            required
            autocomplete="off"
          />
        </p>
      </div>
      <p class="control">
        <span id="findZipcode" class="button address">우편번호 찾기</span>
      </p>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="roughAddress"
            class="input address address-base"
            type="text"
            placeholder="주소"
            readonly
            onfocus="this.blur()"
            required
            autocomplete="off"
          />
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded">
          <input
            id="detailAddress"
            class="input address address-detail"
            type="text"
            placeholder="상세주소를 입력해 주세요."
            required
            autocomplete="off"
          />
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">응원하는 팀</label>
    </div>
    <div class="field-body">
      <div class="field" id="cheerTeam">
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="SSG 랜더스" />
          SSG 랜더스
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="키움 히어로즈" />
          키움 히어로즈
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="LG 트윈스" />
          LG 트윈스
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="KT 위즈" />
          KT 위즈
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="KIA 타이거즈" />
          KIA 타이거즈
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="NC 다이노스" />
          NC 다이노스
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="삼성 라이온즈" />
          삼성 라이온즈
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="롯데 자이언츠" />
          롯데 자이언츠
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="두산 베어스" />
          두산 베어스
        </label>
        <label class="teams tag is-medium">
          <input type="radio" name="team" class="team" value="한화 이글스" />
          한화 이글스
        </label>
      </div>
    </div>
  </div>
  <div class="buttons">
    <button type="submit" class="button is-dark" id="update">
      수정하기
    </button>
  </div>
  </form>
`;

  function showUpdateForm() {
    managementContainer.append(userUpdateForm);

    const updateForm = $('.update-form');
    const newUserEmail = $('#email');
    const newUserPhoneNumber = $('#phoneNumber');
    const findAddress = document.querySelectorAll('.address');
    const teams = document.getElementsByName('team');

    function checkValidation() {
      const regex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (!newUserEmail.value.match(regex)) return false;
      return true;
    }

    function isValid() {
      const warning = $('.email-warning');
      if (!checkValidation()) {
        newUserEmail.classList.add('is-danger');
        warning.classList.remove('hidden');
      } else {
        newUserEmail.classList.remove('is-danger');
        warning.classList.add('hidden');
      }
    }

    function checkAddress() {
      if (
        findAddress[0].value &&
        findAddress[2].value &&
        findAddress[3].value
      ) {
        return true;
      }
      return false;
    }

    function userInfoComplete() {
      if (!checkValidation(newUserEmail)) {
        alert('이메일 형식이 올바르지 않습니다.');
        return false;
      }
      if (!checkAddress()) {
        alert('주소를 입력해 주세요');
        return false;
      }
      return true;
    }

    function autoHyphen() {
      newUserPhoneNumber.value = newUserPhoneNumber.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{3,4})(\d{4})$/, '$1-$2');
    }

    function getPhoneNumber() {
      const firstNumber = $('#firstPhoneNumber');
      return `${firstNumber.options[firstNumber.selectedIndex].text}-${
        newUserPhoneNumber.value
      }`;
    }

    function searchZipcode() {
      new daum.Postcode({
        oncomplete(data) {
          const roadAddr = data.roadAddress;
          document.getElementById('postCode').value = data.zonecode;
          document.getElementById('roughAddress').value = roadAddr;
        },
      }).open();
    }

    function selectTeam() {
      teams.forEach((team) =>
        team.checked
          ? team.parentNode.classList.add('is-info')
          : team.parentNode.classList.remove('is-info')
      );
    }

    function getCheerTeam() {
      const teamID = {
        '롯데 자이언츠': '644221ccead2ae1ca8f0c9d0',
        'KIA 타이거즈': '644221deead2ae1ca8f0c9d2',
        '삼성 라이온즈': '644221e4ead2ae1ca8f0c9d4',
        'LG 트윈스': '644221ecead2ae1ca8f0c9d6',
        '두산 베어스': '644221f4ead2ae1ca8f0c9d8',
        '키움 히어로즈': '644221fcead2ae1ca8f0c9da',
        'SSG 랜더스': '64422203ead2ae1ca8f0c9dc',
        'KT 위즈': '64422209ead2ae1ca8f0c9de',
        '한화 이글스': '64422210ead2ae1ca8f0c9e0',
        'NC 다이노스': '64422215ead2ae1ca8f0c9e2',
      };
      const checkedTeam = Array.from(teams).find((team) => team.checked);
      let selectedTeam;
      checkedTeam === undefined
        ? (selectedTeam = false)
        : (selectedTeam = teamID[checkedTeam.value]);
      return selectedTeam;
    }

    function onUpdateSubmit(e) {
      e.preventDefault();
      if (userInfoComplete()) {
        const newUser = {};
        const userInfoKey = [
          'email',
          'koreanName',
          'phoneNumber',
          'postCode',
          'roughAddress',
          'detailAddress',
          'cheerTeam',
        ];
        userInfoKey.forEach((key) => {
          const userInfo = $(`#${key}`);
          if (key === 'phoneNumber') {
            newUser[key] = getPhoneNumber();
          } else if (key === 'cheerTeam') {
            const isSelected = getCheerTeam();
            if (isSelected) newUser[key] = isSelected;
          } else newUser[key] = userInfo.value;
        });
        const { token } = JSON.parse(getCookie('userToken'));
        newUser['password'] = 'qwer123+';
        console.log(newUser);
        fetch(`/api/v1/users/${newUserEmail.value}`, {
          method: 'PUT',
          headers: {
            token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
          .then((response) => response.json())
          .then(() => {
            alert('회원정보를 수정하였습니다.');
            window.location.reload();
          })
          .catch(() => {
            alert('입력한 정보를 다시 확인해주세요.');
          });
      }
    }

    updateForm.addEventListener('submit', onUpdateSubmit);
    newUserEmail.addEventListener('blur', isValid);
    newUserPhoneNumber.addEventListener('input', autoHyphen);
    for (let i = 0; i < 3; i++) {
      findAddress[i].addEventListener('click', searchZipcode);
    }
    teams.forEach((node) => {
      node.addEventListener('click', selectTeam);
    });
  }
  showUpdateForm();

  function fillCheerTeam(userData) {
    const teamName = userData.cheerTeam.teamName;
    const teams = document.getElementsByName('team');
    const checkedTeam = Array.from(teams).find(
      (team) => team.value === teamName
    );
    checkedTeam.checked = 'checked';
    checkedTeam.parentNode.classList.add('is-info');
  }

  function fillUserInfo(userData) {
    $('#email').value = userData.email;
    $('#koreanName').value = userData.koreanName;
    $('#phoneNumber').value = userData.phoneNumber.substring(4);
    $('#postCode').value = userData.address.postCode;
    $('#roughAddress').value = userData.address.roughAddress;
    $('#detailAddress').value = userData.address.detailAddress;
    fillCheerTeam(userData);
  }

  fillUserInfo(userInfo);
};

render();
