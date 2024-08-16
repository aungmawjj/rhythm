import Calendar from './Calendar';

function App() {
  return (
    <>
      <div className='hidden lg:block fixed top-0 left-0 h-full w-20 bg-blue-100'></div>
      <div className='block lg:hidden fixed bottom-0 left-0 h-20 w-full bg-blue-100'></div>
      <div className='lg:ml-20'>
        <Calendar />
      </div>
    </>
  );
}

export default App;
