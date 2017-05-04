export default function unwrapValue(v){
  switch(typeof(v)){
    case "function":
      return unwrapValue(v());
    case "object":
      return v.toString();
    default:
      return v;
  }
}
