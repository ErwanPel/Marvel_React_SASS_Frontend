import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModalContext } from "../context/ModalContext";

export default function NavPage({ page, setPage, selectPage, setMenu }) {
  const { signModal, loginModal } = useModalContext();

  return (
    <div className="navpage">
      <FontAwesomeIcon
        tabIndex={signModal || loginModal ? "-1" : "0"}
        className={
          page > 1
            ? "navpage__chevron navpage__chevron--left"
            : "navpage__unvisible"
        }
        icon="angles-left"
        onClick={() => {
          setMenu(false);
          setPage(1);
        }}
      />
      <FontAwesomeIcon
        tabIndex={signModal || loginModal ? "-1" : "0"}
        className={
          page > 1
            ? "navpage__chevron navpage__chevron--left"
            : "navpage__unvisible"
        }
        icon="chevron-left"
        onClick={() => {
          setMenu(false);
          setPage(page - 1);
        }}
      />
      <select
        name="page"
        id="page"
        onChange={(event) => {
          setMenu(false);
          setPage(event.target.value);
        }}
        value={page}
        tabIndex={signModal || loginModal ? "-1" : "0"}
      >
        {selectPage.map((element, index) => {
          return (
            <option key={element} value={index + 1}>{`Page ${
              index + 1
            } `}</option>
          );
        })}
      </select>

      <FontAwesomeIcon
        tabIndex={signModal || loginModal ? "-1" : "0"}
        className={
          page < selectPage.length
            ? "navpage__chevron navpage__chevron--right"
            : "navpage__unvisible"
        }
        icon="chevron-right"
        onClick={() => {
          setMenu(false);
          setPage(page + 1);
        }}
      />

      <FontAwesomeIcon
        tabIndex={signModal || loginModal ? "-1" : "0"}
        className={
          page < selectPage.length
            ? "navpage__chevron navpage__chevron--right"
            : "navpage__unvisible"
        }
        icon="angles-right"
        onClick={() => {
          setMenu(false);
          setPage(selectPage.length);
        }}
      />
    </div>
  );
}
