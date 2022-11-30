const UserTableHeader = () => {
  return (
    <>
      <div className="bg-user-table-header-color px-3  w-full rounded-[8px] ">
        <div className="flex  text-neutral-9 w-[calc(100%-65px)] h-[48px] ">
          {/* 1 */}
          <div className="hidden  md:flex items-center justify-start md:w-1/12 lg:w-1/12;  ">
            <input type="checkbox" />
          </div>
          {/* 2 */}
          <div className="hidden md:flex items-center justify-start md:w-2/12 lg:w-2/12 cursor-pointer hover:text-primary">
            <p>Enterprise</p>
          </div>
          {/* 3 */}
          <div className="flex items-center justify-start  md:w-2/12 lg:w-2/12 cursor-pointer hover:text-primary ">
            Nom
          </div>
          {/* 4 */}
          <div className="hidden lg:flex items-center justify-start md:w-4/12 lg:w-4/12  cursor-pointer hover:text-primary">
            Email
          </div>
          {/* 5 */}
          <div className="hidden md:flex items-center justify-start md:w-1/12 lg:w-1/12 cursor-pointer hover:text-primary ">
            Rôle
          </div>
          {/* 6 */}
          <div className="hidden lg:flex items-center justify-start  md:w-2/12 lg:w-2/12 cursor-pointer hover:text-primary ">
            Sites
          </div>
          {/* 7 */}
          <div className="hidden lg:flex items-center justify-start  md:w-2/12 lg:w-2/12 cursor-pointer hover:text-primary ">
            Invité par
          </div>
        </div>
      </div>
    </>
  );
};
export default UserTableHeader;
