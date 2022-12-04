import './UserSideModal.css';
import 'tw-elements';
const UserSideModal = () => {
  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade fixed top-0 right-0 hidden  outline-none overflow-x-hidden overflow-y-auto user-side-modal"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              Modal body text goes here. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Incidunt eum corporis provident, praesentium
              iusto ratione aspernatur perferendis debitis repudiandae, hic nam.
              Doloribus rerum nesciunt sequi ducimus dicta. Repellendus
              recusandae quae accusamus, libero numquam sed. Suscipit minima
              illo tenetur similique quidem! Est doloremque exercitationem eaque
              similique atque reprehenderit quisquam modi eveniet! Et cupiditate
              molestias consequuntur praesentium qui dolorem iure eveniet a
              aliquid voluptas atque architecto tenetur nesciunt, delectus
              consectetur earum dignissimos sed mollitia rem quis pariatur
              commodi. Placeat sed dicta distinctio molestias ullam. Quos
              inventore, itaque minus sequi tenetur voluptate cupiditate quia ut
              ipsam dolore ducimus quidem magnam aliquid quo a.
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      ml-1"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserSideModal;
