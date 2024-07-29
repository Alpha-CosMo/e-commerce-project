const LinkedAccounts = () => {
  return (
    <div className="mt-10 w-[90%] mx-auto">
      <h2 className="text-2xl mb-2 font-medium">Linked Accounts</h2>
      <p className="text-neutral-500">
        We&apos;ll use this to let you sign in and populate your profile
        information
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span className="text-6xl">
          <ion-icon src="/svg/google.svg"></ion-icon>
        </span>
        <p className="font-medium">Google</p>
        <button className="ml-auto rounded-lg bg-gray-400 p-3 text-white">
          Linked
        </button>
      </div>
    </div>
  );
};
export default LinkedAccounts;
