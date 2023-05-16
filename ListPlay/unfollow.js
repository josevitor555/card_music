const buttonFollow = document.getElementById("btn");
let isFollowing = false;

buttonFollow.addEventListener('click', () => {
  if (isFollowing) {
    buttonFollow.textContent = 'Unfollow';
    isFollowing = false;
  } else {
    buttonFollow.textContent = 'Follow';
    isFollowing = true;
  }
});