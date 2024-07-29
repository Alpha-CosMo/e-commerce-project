const AccountStatus = () => {
  return (
    <div className="mx-auto mt-10 w-[90%]">
      <h2 className="mb-2 text-2xl font-medium">Delete My Account</h2>
      <p className="text-neutral-500">
        By deleting your account you will lose all your data permanently
      </p>
      <div className="mt-10 flex flex-col gap-8">
        <button className="w-full rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto">
          Delete My Account
        </button>
        <button className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto">
          Logout
        </button>
      </div>
    </div>
  );
}
export default AccountStatus