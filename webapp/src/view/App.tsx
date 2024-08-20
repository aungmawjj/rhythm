import Calendar from './Calendar';

function App() {
  return (
    <>
      <div
        className='
        fixed left-0 z-10 border-slate-200 bg-white
        max-lg:bottom-0 lg:top-0
        max-lg:border-t lg:border-r
        h-20 w-full lg:h-full lg:w-20'
      >
        {/* Nav bar */}
      </div>
      <div className='pb-24 lg:pb-2 lg:ml-20'>
        <Calendar />
      </div>
    </>
  );
}

export default App;
