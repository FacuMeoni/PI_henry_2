const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;


function validate(name, value) {
    let errors = '';
  
    switch (name) {
      case 'name':
        errors = !value ? 'Please type a name' : '';
        break;
      case 'image':
        errors = !urlRegex.test(value) ? 'Please type an URL' : '';
        break;
      case 'minWeight':
        errors = !value ? 'Please type a minimal weight' : !/\d/.test(value) ? 'Must be a number' : '';
        break;
      case 'maxWeight':
        errors = !value ? 'Please type a maximum weight' : !/\d/.test(value) ? 'Must be a number' : '';
        break;
      case 'minHeight':
        errors = !value ? 'Please type a minimal height' : !/\d/.test(value) ? 'Must be a number' : '';
        break;
      case 'maxHeight':
        errors = !value ? 'Please type a maximum height' : !/\d/.test(value) ? 'Must be a number' : '';
        break;
      case 'minSpan':
        errors = !/\d/.test(value) ? 'Must be a number' : '';
        break;
      case 'maxSpan':
        errors = !/\d/.test(value) ? 'Must be a number' : '';
        break;
      default:
        break;
    }
  
    return errors;
  }

export default validate;