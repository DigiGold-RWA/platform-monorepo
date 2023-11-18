const MainComponent = ({ children }) => {
  return (
    <>
      <section className="bg-card-background rounded-lg py-2 mb-5">
        <div className=" w-full relative shadow-box py-4 px-4">
            {children}
        </div>
      </section>
    </>
  );
};

export default MainComponent;
