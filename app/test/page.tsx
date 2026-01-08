export default function TestInputPage() {
  return (
    <div style={{ padding: '100px', background: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '48px', color: 'red', marginBottom: '50px' }}>
        INPUT TEST PAGE - CAN YOU TYPE BELOW?
      </h1>
      
      <input 
        type="text" 
        placeholder="TYPE HERE NOW!!!" 
        style={{ 
          width: '600px', 
          padding: '30px', 
          fontSize: '28px',
          border: '5px solid red',
          background: 'yellow',
          display: 'block',
          marginBottom: '30px'
        }} 
      />
      
      <textarea 
        placeholder="Can you type in textarea?"
        style={{
          width: '600px',
          height: '150px',
          padding: '20px',
          fontSize: '20px',
          border: '5px solid blue',
          background: 'lightblue',
          display: 'block'
        }}
      />
      
      <p style={{ fontSize: '20px', marginTop: '30px' }}>
        If you CAN type above: SearchBar component or layout is the issue<br/>
        If you CANNOT type above: Global CSS or JavaScript is blocking ALL inputs
      </p>
    </div>
  )
}
