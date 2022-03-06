import SlotGrid from "./slot-grid";
import SampleSlot from "./sample-slot";

const App = () => (
  <div id="app">
    <SlotGrid>
      {new Array(64).fill("BD 808").map((name, index) => <SampleSlot key={index + name} name={`${index} ${name}`} />)}
    </SlotGrid>
  </div>
);

export default App;
