function InputSection({ onSubmit, prompt, setPrompt }) {
    return (
      <form onSubmit={onSubmit} className="input-section">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
  
  export default InputSection;
  