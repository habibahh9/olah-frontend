import { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoOlah from "../assets/logo-olah.png";
import food14 from "../assets/asset14.png"; 
import food15 from "../assets/asset15.png"; 
import food16 from "../assets/asset16.png";
import food17 from "../assets/asset17.png";
import food18 from "../assets/asset18.png";
import food19 from "../assets/asset19.png";
import food20 from "../assets/asset20.png"; 
import food21 from "../assets/asset21.png"; 

const NAV_ITEMS = [
  { label: "Beranda", path: "/dashboard", icon: ( <svg width="22" height="22" viewBox="0 0 46 47" fill="none"><path d="M44.8763 19.7641L25.7097 1.09287C24.9909 0.393093 24.0162 0 23 0C21.9838 0 21.0091 0.393093 20.2903 1.09287L1.12367 19.7641C0.765982 20.11 0.482445 20.5216 0.289545 20.9752C0.0966444 21.4288 -0.0017697 21.9152 2.40864e-05 22.4061V44.8116C2.40864e-05 45.3068 0.201958 45.7817 0.561403 46.1318C0.920847 46.482 1.40836 46.6787 1.91669 46.6787H17.25C17.7583 46.6787 18.2458 46.482 18.6053 46.1318C18.9647 45.7817 19.1667 45.3068 19.1667 44.8116V31.7417H26.8333V44.8116C26.8333 45.3068 27.0353 45.7817 27.3947 46.1318C27.7542 46.482 28.2417 46.6787 28.75 46.6787H44.0833C44.5916 46.6787 45.0792 46.482 45.4386 46.1318C45.798 45.7817 46 45.3068 46 44.8116V22.4061C46.0018 21.9152 45.9034 21.4288 45.7105 20.9752C45.5176 20.5216 45.234 20.11 44.8763 19.7641ZM42.1666 42.9445H30.6667V29.8746C30.6667 29.3794 30.4647 28.9045 30.1053 28.5543C29.7458 28.2042 29.2583 28.0075 28.75 28.0075H17.25C16.7417 28.0075 16.2542 28.2042 15.8947 28.5543C15.5353 28.9045 15.3333 29.3794 15.3333 29.8746V42.9445H3.83335V22.4061L23 3.73485L42.1666 22.4061V42.9445Z" fill="currentColor"/></svg> ) },
  { label: "Bahan",   path: "/bahan",     icon: ( <svg width="22" height="22" viewBox="0 0 47 53" fill="none"><path d="M45.2583 11.7029H39.0123L44.7489 5.28092C44.9107 5.0997 45.0391 4.88456 45.1267 4.64779C45.2142 4.41101 45.2593 4.15724 45.2593 3.90096C45.2593 3.64467 45.2142 3.3909 45.1267 3.15412C45.0391 2.91735 44.9107 2.70221 44.7489 2.52099C44.5871 2.33977 44.395 2.19602 44.1836 2.09795C43.9721 1.99987 43.7455 1.94939 43.5167 1.94939C43.2878 1.94939 43.0612 1.99987 42.8498 2.09795C42.6384 2.19602 42.4463 2.33977 42.2845 2.52099L36.5501 8.94538V1.95048C36.5501 1.43318 36.3666 0.937067 36.04 0.571282C35.7133 0.205496 35.2703 0 34.8084 0C34.3465 0 33.9035 0.205496 33.5769 0.571282C33.2503 0.937067 33.0668 1.43318 33.0668 1.95048V9.89136C30.4129 8.17563 27.328 7.48752 24.2897 7.93356C21.2514 8.37961 18.4291 9.93492 16.2598 12.3587C7.52975 21.9624 0.965885 44.8049 0.325826 47.0894C0.0240474 47.8149 -0.0711896 48.6267 0.0530321 49.4148C0.177254 50.203 0.514922 50.9292 1.02024 51.4951C1.52556 52.061 2.17407 52.4392 2.87782 52.5783C3.58157 52.7174 4.30649 52.6108 4.95427 52.2728C6.99419 51.556 27.4173 44.1954 35.971 34.4235C38.1337 31.9934 39.521 28.8327 39.9181 25.4307C40.3152 22.0286 39.7 18.5748 38.1676 15.6038H45.2583C45.7203 15.6038 46.1633 15.3983 46.4899 15.0325C46.8165 14.6668 47 14.1706 47 13.6533C47 13.136 46.8165 12.6399 46.4899 12.2741C46.1633 11.9084 45.7203 11.7029 45.2583 11.7029ZM33.4761 31.6953C31.5298 33.9188 28.8498 36.0351 25.889 37.9685L20.3636 31.7782C20.2017 31.5969 20.0096 31.4532 19.7982 31.3551C19.5868 31.257 19.3602 31.2066 19.1313 31.2066C18.9025 31.2066 18.6759 31.257 18.4645 31.3551C18.253 31.4532 18.0609 31.5969 17.8991 31.7782C17.7373 31.9594 17.6089 32.1745 17.5214 32.4113C17.4338 32.6481 17.3887 32.9018 17.3887 33.1581C17.3887 33.4144 17.4338 33.6682 17.5214 33.9049C17.6089 34.1417 17.7373 34.3569 17.8991 34.5381L22.7083 39.9238C13.8106 45.0902 3.91581 48.5596 3.76777 48.6108C3.66056 48.6497 3.55702 48.7004 3.45863 48.7619C3.51123 48.6523 3.55424 48.5371 3.58708 48.4182C3.65021 48.1914 9.68287 26.5777 17.5203 16.5596L24.8723 24.793C25.1991 25.159 25.6423 25.3646 26.1045 25.3646C26.5667 25.3646 27.0099 25.159 27.3367 24.793C27.6635 24.427 27.8471 23.9306 27.8471 23.413C27.8471 22.8955 27.6635 22.3991 27.3367 22.0331L20.0435 13.8679C22.1803 12.1653 24.8106 11.4247 27.4123 11.793C30.0141 12.1614 32.397 13.6117 34.0882 15.8563C35.7794 18.1008 36.6553 20.9754 36.5419 23.9095C36.4285 26.8437 35.3341 29.6228 33.4761 31.6953Z" fill="currentColor"/></svg> ) },
  { label: "Resep",   path: "/resep",     icon: ( <svg width="22" height="22" viewBox="0 0 46 53" fill="none"><path d="M36.4167 21.9324C36.4167 22.5141 36.2147 23.0719 35.8553 23.4832C35.4958 23.8945 35.0083 24.1256 34.5 24.1256H19.1667C18.6583 24.1256 18.1708 23.8945 17.8114 23.4832C17.4519 23.0719 17.25 22.5141 17.25 21.9324C17.25 21.3507 17.4519 20.7928 17.8114 20.3815C18.1708 19.9702 18.6583 19.7391 19.1667 19.7391H34.5C35.0083 19.7391 35.4958 19.9702 35.8553 20.3815C36.2147 20.7928 36.4167 21.3507 36.4167 21.9324ZM34.5 28.5121H19.1667C18.6583 28.5121 18.1708 28.7432 17.8114 29.1545C17.4519 29.5658 17.25 30.1236 17.25 30.7053C17.25 31.287 17.4519 31.8449 17.8114 32.2562C18.1708 32.6675 18.6583 32.8986 19.1667 32.8986H34.5C35.0083 32.8986 35.4958 32.6675 35.8553 32.2562C36.2147 31.8449 36.4167 31.287 36.4167 30.7053C36.4167 30.1236 36.2147 29.5658 35.8553 29.1545C35.4958 28.7432 35.0083 28.5121 34.5 28.5121ZM46 4.38647V48.2512C46 49.4146 45.5961 50.5303 44.8772 51.3529C44.1584 52.1755 43.1833 52.6377 42.1667 52.6377H3.83333C2.81667 52.6377 1.84165 52.1755 1.12276 51.3529C0.403868 50.5303 0 49.4146 0 48.2512V4.38647C0 3.22311 0.403868 2.10739 1.12276 1.28477C1.84165 0.462145 2.81667 0 3.83333 0H42.1667C43.1833 0 44.1584 0.462145 44.8772 1.28477C45.5961 2.10739 46 3.22311 46 4.38647ZM3.83333 48.2512H9.58333V4.38647H3.83333V48.2512ZM42.1667 48.2512V4.38647H13.4167V48.2512H42.1667Z" fill="currentColor"/></svg> ) },
  { label: "Keranjang", path: "/keranjang", icon: ( <svg width="22" height="22" viewBox="0 0 44 49" fill="none"><path d="M43.6163 9.65765C43.4633 9.45521 43.272 9.29238 43.0559 9.18066C42.8398 9.06894 42.6042 9.01106 42.3657 9.0111H9.50783L8.26945 1.48007C8.20124 1.06481 8.00342 0.689203 7.71049 0.418726C7.41755 0.148248 7.04808 6.09989e-05 6.66648 0H1.62945C1.19729 0 0.782835 0.189876 0.477254 0.527858C0.171673 0.86584 0 1.32424 0 1.80222C0 2.2802 0.171673 2.7386 0.477254 3.07658C0.782835 3.41457 1.19729 3.60444 1.62945 3.60444H5.29571L10.5018 35.2086C10.6552 36.1459 11.0297 37.0218 11.5874 37.7475C10.8176 38.5428 10.262 39.5583 9.98212 40.6815C9.70228 41.8048 9.70917 42.9918 10.002 44.1109C10.2949 45.23 10.8623 46.2376 11.6412 47.0219C12.4202 47.8062 13.3804 48.3365 14.4152 48.5541C15.4501 48.7716 16.5192 48.668 17.504 48.2545C18.4889 47.8411 19.3509 47.134 19.9946 46.2118C20.6383 45.2896 21.0385 44.1882 21.1508 43.0297C21.2631 41.8713 21.0832 40.7011 20.6309 39.6489H29.8821C29.5175 40.493 29.3289 41.4168 29.3301 42.3522C29.3301 43.5998 29.6646 44.8193 30.2912 45.8566C30.9179 46.8939 31.8086 47.7024 32.8507 48.1798C33.8928 48.6572 35.0395 48.7822 36.1458 48.5388C37.252 48.2954 38.2682 47.6946 39.0658 46.8125C39.8634 45.9303 40.4066 44.8064 40.6266 43.5828C40.8467 42.3592 40.7337 41.0909 40.3021 39.9383C39.8704 38.7857 39.1395 37.8006 38.2016 37.1075C37.2637 36.4144 36.1611 36.0444 35.0331 36.0444H15.3107C14.9291 36.0444 14.5596 35.8962 14.2667 35.6257C13.9738 35.3552 13.7759 34.9796 13.7077 34.5643L13.0621 30.6378H36.6891C37.8339 30.6376 38.9423 30.193 39.8211 29.3816C40.6999 28.5701 41.2934 27.4433 41.498 26.1975L43.9747 11.1355C44.0167 10.8751 44.0063 10.6078 43.9443 10.3524C43.8824 10.097 43.7704 9.85981 43.6163 9.65765ZM17.9239 42.3522C17.9239 42.8869 17.7806 43.4095 17.512 43.8541C17.2435 44.2986 16.8617 44.6451 16.4151 44.8497C15.9685 45.0544 15.4771 45.1079 15.0029 45.0036C14.5288 44.8993 14.0933 44.6418 13.7515 44.2637C13.4096 43.8857 13.1769 43.404 13.0826 42.8796C12.9882 42.3552 13.0366 41.8116 13.2216 41.3177C13.4066 40.8237 13.7199 40.4015 14.1219 40.1045C14.5238 39.8074 14.9964 39.6489 15.4798 39.6489C16.128 39.6489 16.7497 39.9337 17.2081 40.4407C17.6664 40.9476 17.9239 41.6352 17.9239 42.3522ZM37.4773 42.3522C37.4773 42.8869 37.334 43.4095 37.0654 43.8541C36.7968 44.2986 36.4151 44.6451 35.9685 44.8497C35.5219 45.0544 35.0304 45.1079 34.5563 45.0036C34.0822 44.8993 33.6467 44.6418 33.3049 44.2637C32.963 43.8857 32.7302 43.404 32.6359 42.8796C32.5416 42.3552 32.59 41.8116 32.775 41.3177C32.96 40.8237 33.2733 40.4015 33.6752 40.1045C34.0772 39.8074 34.5497 39.6489 35.0331 39.6489C35.6814 39.6489 36.3031 39.9337 36.7614 40.4407C37.2198 40.9476 37.4773 41.6352 37.4773 42.3522ZM38.292 25.5532C38.2236 25.9696 38.0249 26.3461 37.7307 26.6168C37.4365 26.8874 37.0656 27.0348 36.683 27.0333H12.4694L10.1005 12.6155H40.4124L38.292 25.5532Z" fill="currentColor"/></svg> ) },
  { label: "Riwayat", path: "/riwayat",   icon: ( <svg width="22" height="22" viewBox="0 0 44 39" fill="none"><path d="M24.6477 9.6834V18.4529L32.5966 22.8245C32.997 23.0449 33.2854 23.4021 33.3985 23.8175C33.5116 24.2329 33.44 24.6725 33.1996 25.0396C32.9591 25.4066 32.5694 25.671 32.1163 25.7747C31.6631 25.8783 31.1836 25.8127 30.7832 25.5923L21.9805 20.7506C21.7199 20.6072 21.5044 20.4043 21.3547 20.1618C21.2051 19.9192 21.1265 19.6454 21.1266 19.3667V9.6834C21.1266 9.25537 21.3121 8.84487 21.6423 8.5422C21.9724 8.23954 22.4202 8.06951 22.8871 8.06951C23.3541 8.06951 23.8019 8.23954 24.132 8.5422C24.4622 8.84487 24.6477 9.25537 24.6477 9.6834ZM22.8871 5.97366e-05C20.1099 -0.00628194 17.3588 0.492364 14.7931 1.46714C12.2275 2.44192 9.8982 3.87346 7.94008 5.67893C6.34018 7.16371 4.91854 8.592 3.5211 10.0869V6.45562C3.5211 6.02759 3.33561 5.61709 3.00545 5.31442C2.67528 5.01176 2.22748 4.84173 1.76055 4.84173C1.29362 4.84173 0.84582 5.01176 0.515653 5.31442C0.185486 5.61709 0 6.02759 0 6.45562V14.5251C0 14.9531 0.185486 15.3636 0.515653 15.6663C0.84582 15.9689 1.29362 16.139 1.76055 16.139H10.5633C11.0302 16.139 11.478 15.9689 11.8082 15.6663C12.1384 15.3636 12.3238 14.9531 12.3238 14.5251C12.3238 14.097 12.1384 13.6865 11.8082 13.3839C11.478 13.0812 11.0302 12.9112 10.5633 12.9112H5.50172C7.07521 11.2126 8.6421 9.61279 10.4291 7.95452C12.8759 5.71152 15.9895 4.17924 19.3809 3.54916C22.7723 2.91907 26.2911 3.21912 29.4975 4.4118C32.704 5.60448 35.4559 7.63691 37.4095 10.2551C39.363 12.8734 40.4316 15.9613 40.4817 19.133C40.5317 22.3048 39.561 25.4197 37.6909 28.0887C35.8208 30.7576 33.1341 32.8621 29.9667 34.1393C26.7992 35.4165 23.2914 35.8098 19.8815 35.2699C16.4717 34.73 13.311 33.2809 10.7944 31.1037C10.6262 30.958 10.4283 30.8441 10.2121 30.7685C9.99588 30.6929 9.76552 30.6571 9.5342 30.6631C9.30287 30.6691 9.0751 30.7168 8.86388 30.8034C8.65266 30.8901 8.46214 31.0141 8.30319 31.1683C8.14424 31.3225 8.01998 31.5039 7.9375 31.7021C7.85501 31.9003 7.81593 32.1114 7.82246 32.3235C7.829 32.5355 7.88104 32.7444 7.97561 32.938C8.07018 33.1316 8.20542 33.3062 8.37362 33.452C10.8812 35.6212 13.9298 37.1948 17.2534 38.0356C20.577 38.8764 24.0745 38.9587 27.4408 38.2754C30.8071 37.5921 33.9398 36.1639 36.5655 34.1155C39.1912 32.0672 41.2302 29.4608 42.5043 26.524C43.7785 23.5871 44.2493 20.409 43.8755 17.267C43.5017 14.1251 42.2947 11.1147 40.3598 8.49867C38.425 5.88264 35.8212 3.74045 32.7755 2.25907C29.7299 0.777681 26.335 0.0021169 22.8871 5.97366e-05Z" fill="currentColor"/></svg> ) },
];

function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ikon trash 
function IconTrash({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DeleteModal({ item, onConfirm, onCancel }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[320px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ikon peringatan */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <IconTrash size={26} color="#e53e3e" />
          </div>
        </div>
        <h3 className="text-center text-[16px] font-semibold text-gray-800 mb-1">
          Hapus Bahan?
        </h3>
        <p className="text-center text-sm text-gray-500 mb-6">
          <span className="font-medium text-[#d06224]">{item.name}</span> akan dihapus
          dari daftar bahan kamu.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-[40px] rounded-full border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-[40px] rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BahanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); 

  const [sortOrder, setSortOrder] = useState(
    () => loadStorage("bahan_sortOrder", null)
  );

  const handleSort = () => {
    setSortOrder((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  };

  // hapus item
  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.id !== deleteTarget.id),
      }))
    );
    setDeleteTarget(null);
  };

  useEffect(() => {
    if (location.state?.newItem) {
      const item = location.state.newItem;
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === item.kategori
            ? { ...cat, items: [...cat.items, item] }
            : cat
        )
      );
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  const [categories, setCategories] = useState(() => {
    const savedItems = loadStorage("bahan_items", null);
    const initial = [
      {
        id: "sayuran",
        label: "Sayuran",
        color: "#d06224",
        icon: (
          <svg width="22" height="22" viewBox="0 0 47 53" fill="none">
            <path d="M45.2583 11.7029H39.0123L44.7489 5.28092C44.9107 5.0997 45.0391 4.88456 45.1267 4.64779C45.2142 4.41101 45.2593 4.15724 45.2593 3.90096C45.2593 3.64467 45.2142 3.3909 45.1267 3.15412C45.0391 2.91735 44.9107 2.70221 44.7489 2.52099C44.5871 2.33977 44.395 2.19602 44.1836 2.09795C43.9721 1.99987 43.7455 1.94939 43.5167 1.94939C43.2878 1.94939 43.0612 1.99987 42.8498 2.09795C42.6384 2.19602 42.4463 2.33977 42.2845 2.52099L36.5501 8.94538V1.95048C36.5501 1.43318 36.3666 0.937067 36.04 0.571282C35.7133 0.205496 35.2703 0 34.8084 0C34.3465 0 33.9035 0.205496 33.5769 0.571282C33.2503 0.937067 33.0668 1.43318 33.0668 1.95048V9.89136C30.4129 8.17563 27.328 7.48752 24.2897 7.93356C21.2514 8.37961 18.4291 9.93492 16.2598 12.3587C7.52975 21.9624 0.965885 44.8049 0.325826 47.0894C0.0240474 47.8149 -0.0711896 48.6267 0.0530321 49.4148C0.177254 50.203 0.514922 50.9292 1.02024 51.4951C1.52556 52.061 2.17407 52.4392 2.87782 52.5783C3.58157 52.7174 4.30649 52.6108 4.95427 52.2728C6.99419 51.556 27.4173 44.1954 35.971 34.4235C38.1337 31.9934 39.521 28.8327 39.9181 25.4307C40.3152 22.0286 39.7 18.5748 38.1676 15.6038H45.2583C45.7203 15.6038 46.1633 15.3983 46.4899 15.0325C46.8165 14.6668 47 14.1706 47 13.6533C47 13.136 46.8165 12.6399 46.4899 12.2741C46.1633 11.9084 45.7203 11.7029 45.2583 11.7029Z" fill="currentColor"/>
          </svg>
        ),
        items: [
          { id: 1, name: "Wortel",   qty: "2 Kg",   days: "7 Hari", image: food14 },
          { id: 2, name: "Bayam",    qty: "1 Ikat",  days: "2 Hari", image: food15 },
          { id: 3, name: "Cabe",     qty: "0.5 Kg",  days: "7 Hari", image: food16 },
          { id: 4, name: "Sawi",     qty: "1 Ikat",  days: "2 Hari", image: food17 },
          { id: 5, name: "Kangkung", qty: "1 Ikat",  days: "2 Hari", image: food18 },
        ],
      },
      {
        id: "protein",
        label: "Protein",
        color: "#d06224",
        icon: (
          <svg width="22" height="22" viewBox="0 0 50 50" fill="none">
            <path d="M45 16C45 16 43 10 38 8C35 7 31 7 25 7C19 7 15 7 12 8C7 10 5 16 5 16H2C2 16 1 17 2 18L4 22C4 22 3 24 3 27C3 33 6 37 10 39V44C10 45 11 46 12 46H16C17 46 18 45 18 44V40H32V44C32 45 33 46 34 46H38C39 46 40 45 40 44V39C44 37 47 33 47 27C47 24 46 22 46 22L48 18C49 17 48 16 45 16ZM17 30C15.3 30 14 28.7 14 27C14 25.3 15.3 24 17 24C18.7 24 20 25.3 20 27C20 28.7 18.7 30 17 30ZM33 30C31.3 30 30 28.7 30 27C30 25.3 31.3 24 33 24C34.7 24 36 25.3 36 27C36 28.7 34.7 30 33 30Z" fill="currentColor"/>
          </svg>
        ),
        items: [
          { id: 6, name: "Daging Ayam", qty: "1 Kg", days: "5 Hari", image: food19 },
          { id: 7, name: "Daging Sapi", qty: "2 Kg", days: "7 Hari", image: food20 },
        ],
      },
      {
        id: "lainnya",
        label: "Lainnya",
        color: "#d06224",
        icon: (
          <svg width="22" height="22" viewBox="0 0 46 53" fill="none">
            <path d="M36.4167 21.9324C36.4167 22.5141 36.2147 23.0719 35.8553 23.4832C35.4958 23.8945 35.0083 24.1256 34.5 24.1256H19.1667C18.6583 24.1256 18.1708 23.8945 17.8114 23.4832C17.4519 23.0719 17.25 22.5141 17.25 21.9324C17.25 21.3507 17.4519 20.7928 17.8114 20.3815C18.1708 19.9702 18.6583 19.7391 19.1667 19.7391H34.5C35.0083 19.7391 35.4958 19.9702 35.8553 20.3815C36.2147 20.7928 36.4167 21.3507 36.4167 21.9324ZM46 4.38647V48.2512C46 49.4146 45.5961 50.5303 44.8772 51.3529C44.1584 52.1755 43.1833 52.6377 42.1667 52.6377H3.83333C2.81667 52.6377 1.84165 52.1755 1.12276 51.3529C0.403868 50.5303 0 49.4146 0 48.2512V4.38647C0 3.22311 0.403868 2.10739 1.12276 1.28477C1.84165 0.462145 2.81667 0 3.83333 0H42.1667C43.1833 0 44.1584 0.462145 44.8772 1.28477C45.5961 2.10739 46 3.22311 46 4.38647ZM3.83333 48.2512H9.58333V4.38647H3.83333V48.2512ZM42.1667 48.2512V4.38647H13.4167V48.2512H42.1667Z" fill="currentColor"/>
          </svg>
        ),
        items: [
          { id: 8, name: "Santan", qty: "1 Ltr", days: "3 Hari", image: food21 },
        ],
      },
    ];

    if (!savedItems) return initial;

    const imageMap = {
      1: food14, 2: food15, 3: food16, 4: food17, 5: food18,
      6: food19, 7: food20, 8: food21,
    };

    return initial.map((cat) => ({
      ...cat,
      items: savedItems[cat.id]
        ? savedItems[cat.id].map((item) => ({
            ...item,
            image: imageMap[item.id] ?? null,
          }))
        : cat.items,
    }));
  });

  useEffect(() => { saveStorage("bahan_sortOrder", sortOrder); }, [sortOrder]);

  useEffect(() => {
    const itemsMap = {};
    categories.forEach((cat) => {
      itemsMap[cat.id] = cat.items.map(({ image, ...rest }) => rest);
    });
    saveStorage("bahan_items", itemsMap);
  }, [categories]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories.map((cat) => ({
        ...cat,
        items: sortOrder
          ? [...cat.items].sort((a, b) =>
              sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
            )
          : cat.items,
      }));
    }
    const q = searchQuery.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items
          .filter((item) => item.name.toLowerCase().includes(q))
          .sort((a, b) =>
            sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : sortOrder === "desc"
              ? b.name.localeCompare(a.name)
              : 0
          ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery, categories, sortOrder]);

  const allItems = filteredCategories.flatMap((cat) => cat.items);

  return (
    <div className="flex min-h-screen bg-[#f4f4f4]">

      {/* sidebar desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 w-[110px] h-screen bg-white shadow-lg flex-col items-center py-5 gap-7 z-50">
        <img src={logoOlah} alt="OLAH Logo" className="w-14 object-contain mb-1" />
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.label} onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition text-xs font-medium w-full px-2 ${isActive ? "text-[#d06224]" : "text-gray-400 hover:text-[#d06224]"}`}>
              {item.icon}
              <span className="leading-tight">{item.label}</span>
            </button>
          );
        })}
      </aside>

      {/* navigasi bawah mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-50">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.label} onClick={() => navigate(item.path)}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-[10px] font-medium transition ${isActive ? "text-[#d06224]" : "text-gray-400"}`}>
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* konten utama */}
      <div className="md:ml-[110px] flex-1 flex flex-col overflow-hidden min-w-0 pb-16 md:pb-0">

        {/* konfirmasi hapus */}
        <DeleteModal
          item={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />

        {/* header */}
        <div className="h-[70px] md:h-[80px] bg-white shadow-sm flex items-center px-4 md:px-10">
          <h1 className="text-[22px] md:text-[24px] font-semibold text-[#d06224]">
            Bahan Makanan
          </h1>
        </div>

        {/* content */}
        <div className="px-3 md:px-7 py-4 md:py-5">

          {/* search */}
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex">
              <input
                type="text"
                placeholder="Cari Bahan Makanan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-[42px] rounded-l-full px-5 bg-white outline-none text-sm shadow-sm min-w-0"
              />
              <button className="w-[48px] h-[42px] shrink-0 rounded-r-full bg-[#d06224] flex items-center justify-center shadow-sm">
                <svg width="16" height="16" viewBox="0 0 28 27" fill="none">
                  <path d="M26.5865 24.2967L20.6502 18.3986C22.4301 16.095 23.2611 13.2053 22.9746 10.3156C22.6881 7.42597 21.3056 4.75272 19.1075 2.83817C16.9095 0.923624 14.0604 -0.0888533 11.1383 0.00612555C8.21628 0.101104 5.43999 1.29643 3.37267 3.34962C1.30535 5.4028 0.1018 8.16011 0.00616771 11.0622C-0.0894648 13.9643 0.929981 16.7939 2.85771 18.9769C4.78543 21.16 7.47708 22.533 10.3866 22.8175C13.2962 23.1021 16.2058 22.2768 18.5252 20.5091L24.4665 26.4109C24.606 26.5495 24.7716 26.6594 24.9539 26.7344C25.1363 26.8094 25.3316 26.848 25.529 26.848C25.7263 26.848 25.9217 26.8094 26.104 26.7344C26.2863 26.6594 26.4519 26.5495 26.5915 26.4109C26.731 26.2724 26.8417 26.1078 26.9172 25.9268C26.9927 25.7457 27.0316 25.5517 27.0316 25.3557C27.0316 25.1597 26.9927 24.9657 26.9172 24.7846C26.8417 24.6035 26.731 24.439 26.5915 24.3005L26.5865 24.2967ZM3.02522 11.4464C3.02522 9.77678 3.52374 8.14463 4.45773 6.75637C5.39172 5.36811 6.71924 4.28609 8.27241 3.64714C9.82558 3.00819 11.5346 2.84102 13.1835 3.16675C14.8323 3.49248 16.3469 4.29649 17.5356 5.47711C18.7244 6.65773 19.5339 8.16193 19.8619 9.7995C20.1899 11.4371 20.0215 13.1345 19.3782 14.677C18.7348 16.2196 17.6454 17.538 16.2476 18.4656C14.8497 19.393 13.2346 19.9115 11.5735 19.9115C9.33278 19.9115 7.18377 19.0278 5.6114 17.4657C4.03904 15.9036 3.02522 13.7694 3.02522 11.4464Z" fill="white"/>
                </svg>
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSort}
                className={`flex-1 h-[40px] rounded-full text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors
                  ${sortOrder ? "bg-[#7a763a]" : "bg-[#9f9b4a]"}`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6H21M6 12H18M10 18H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {sortOrder === "asc" ? "A → Z" : sortOrder === "desc" ? "Z → A" : "Urutkan"}
              </button>
              <button
                onClick={() => navigate("/tambah-item")}
                className="flex-1 h-[40px] rounded-full bg-[#d06224] text-white text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                Tambah Item
              </button>
            </div>
          </div>

          {/* card */}
          <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm">
            {allItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                <p className="text-sm">Tidak ada bahan ditemukan</p>
              </div>
            ) : (
              <>
                {/* mobile */}
                <div className="flex flex-col gap-2 sm:hidden">
                  {allItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                      {/* gambar */}
                      <div className="w-[72px] h-[72px] shrink-0 overflow-hidden border-r-2 border-[#d06224]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      {/* info */}
                      <div className="flex-1 py-2 min-w-0">
                        <p className="text-sm font-semibold text-[#d06224] truncate leading-snug">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.qty}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="#d06224" strokeWidth="2"/>
                            <path d="M12 7V12L15 15" stroke="#d06224" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span className="text-xs text-gray-400">{item.days}</span>
                        </div>
                      </div>
                      {/* tombol hapus */}
                      <button onClick={() => setDeleteTarget(item)} aria-label={`Hapus ${item.name}`}
                        className="w-[40px] h-[40px] shrink-0 mr-2 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition">
                        <IconTrash size={15} color="#e53e3e" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* desktop */}
                <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {allItems.map((item) => (
                    <div key={item.id} className="group relative h-[150px] rounded-xl overflow-hidden cursor-pointer">
                      {/* gambar */}
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover scale-110" />
                      {/* overlay */}
                      <div className="absolute bottom-0 left-0 right-0 h-[56px]" style={{ background: "rgba(208, 98, 36, 0.80)" }} />
                      {/* teks */}
                      <div className="absolute bottom-[8px] left-[8px] right-[28px]">
                        <p className="text-white font-semibold text-xs leading-snug truncate">{item.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-white/80 text-[10px]">{item.qty}</span>
                          <span className="text-white/50 text-[10px]">·</span>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                            <path d="M12 7V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span className="text-white/80 text-[10px]">{item.days}</span>
                        </div>
                      </div>
                      {/* tombol hapus */}
                      <button onClick={() => setDeleteTarget(item)} aria-label={`Hapus ${item.name}`}
                        className="absolute bottom-[8px] right-[6px] w-[30px] h-[30px] rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40">
                        <IconTrash size={16} color="white" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}