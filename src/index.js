import "./styles.css";

const onClickAdd = () => {
  const inputText = document.querySelector("#add-text").value;
  document.querySelector("#add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.querySelector("#incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // ulタグの生成
  const ul = document.createElement("ul");
  ul.className = "list-row";

  // liタグの生成
  const li = document.createElement("li");
  li.innerText = text;

  // button(削除)タグの生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 完了リストに追加する要素
    const addTarget = deleteButton.parentNode;

    // 押された削除ボタンの親タグ(ul)未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  // button(完了)タグの生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ(ul)未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);

    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode;

    // TODO内容テキストを取得
    const text = addTarget.firstElementChild.innerText;

    // ul以下を初期化する
    addTarget.textContent = null;

    // liタグを生成
    const li = document.createElement("li");
    li.innerText = text;

    // buttonタグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタン親タグを(ul)を完了リストから削除
      const deleteTarget = backButton.parentNode;
      document.querySelector("#complete-list").removeChild(deleteTarget);

      // テキストを取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    // divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    // 完了リストに追加
    document.querySelector("#complete-list").appendChild(addTarget);
  });

  // ulタグの子要素の各要素を取得する
  ul.appendChild(li);
  ul.appendChild(completeButton);
  ul.appendChild(deleteButton);

  // 未完了リストの追加
  document.querySelector("#incomplete-list").appendChild(ul);
};

document
  .querySelector("#add-button")
  .addEventListener("click", () => onClickAdd());
