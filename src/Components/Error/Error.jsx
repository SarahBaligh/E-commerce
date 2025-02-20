import errorImg from "./../../assets/images/error.svg";

function Error() {
  return (
    <>
      <div className="w-1/2 mx-auto py-12 mt-12">
        <img src={errorImg} alt="" className="w-full" />
      </div>
    </>
  );
}

export default Error;
