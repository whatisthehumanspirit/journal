function showSizes() {
  var gender = $('#Gender').attr('value');

  if (gender == 'Unknown') {
    $('#SelectFemaleShoeSize').css('display', 'none');
    $('#FemaleShoeSize').attr('value', '0');
    $('#SelectMaleShoeSize').css('display', 'none');
    $('#MaleShoeSize').attr('value', '0');
    $('#SelectShoeSize').css('display', 'block');
    $('#ShoeSize').attr('value', '0');
  } else if (gender == 'Female') {
    $('#SelectShoeSize').css('display', 'none');
    $('#ShoeSize').attr('value', '0');
    $('#SelectMaleShoeSize').css('display', 'none');
    $('#MaleShoeSize').attr('value', '0');
    $('#SelectFemaleShoeSize').css('display', 'block');
    $('#FemaleShoeSize').attr('value', '0');
  } else if (gender == 'Male') {
    $('#SelectShoeSize').css('display', 'none');
    $('#ShoeSize').attr('value', '0');
    $('#SelectFemaleShoeSize').css('display', 'none');
    $('#FemaleShoeSize').attr('value', '0');
    $('#SelectMaleShoeSize').css('display', 'block');
    $('#MaleShoeSize').attr('value', '0');
  } else {
    $('#SelectFemaleShoeSize').css('display', 'none');
    $('#FemaleShoeSize').attr('value', '0');
    $('#SelectMaleShoeSize').css('display', 'none');
    $('#MaleShoeSize').attr('value', '0');
    $('#SelectShoeSize').css('display', 'block');
    $('#ShoeSize').attr('value', '0');
  }
}