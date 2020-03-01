import React from "react";
import PropTypes from "prop-types";

const icons = {
  Bug: props => (
    <svg width={512} height={512} fill="white" viewBox="0 0 512 512" {...props}>
      <path
        id="bug"
        fillRule="evenodd"
        d="M342.198.501a1.176 1.176 0 011.637-.288l36.354 25.455c.532.372.661 1.105.289 1.637l-50.599 72.262c24.599 7.859 41.358 16.336 41.358 16.336s-40.964 70.462-110.443 70.462-118.85-65.672-118.85-65.672 17.506-11.172 43.456-20.754l-55.5-66.141a1.176 1.176 0 01.145-1.656l33.997-28.527a1.175 1.175 0 011.656.145l70.272 83.746c6.017-.68 12.147-1.06 18.333-1.06 8.891 0 17.771.675 26.44 1.822zm13.746 189.201c18.541-13.242 46.597-47.804 46.597-47.804s71.664 56.79 71.664 177.206c0 120.415-123.896 192.888-123.896 192.888s-59.195-59.781-73.727-135.562c-14.531-75.781 21.496-159.927 21.496-159.927s39.324-13.559 57.866-26.801zm-199.683 0c-18.541-13.242-46.597-47.804-46.597-47.804S38 198.688 38 319.104c0 120.415 123.896 192.888 123.896 192.888s59.195-59.781 73.727-135.562c14.531-75.781-21.496-159.927-21.496-159.927s-39.324-13.559-57.866-26.801z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Dark: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="dark"
        fillRule="evenodd"
        d="M229.379 452.85a197.056 197.056 0 0029.833 2.261c108.002 0 195.555-87.553 195.555-195.555C454.767 151.553 367.214 64 259.212 64c-7.246 0-14.401.394-21.442 1.162 53.575 40.589 88.997 110.9 88.997 190.838 0 84.04-39.151 157.44-97.388 196.85zM255.656 512c141.385 0 256-114.615 256-256S397.041 0 255.656 0s-256 114.615-256 256 114.615 256 256 256z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Dragon: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="dragon"
        fillRule="evenodd"
        d="M280.702 254.881c3.47-2.116 6.414-6.55 8.788-11.478 31.245 12.77 53.202 42.946 53.202 78.137 0 46.75-38.75 84.649-86.55 84.649-19.622 0-37.719-6.387-52.236-17.15-4.762-2.255-8.68-4.421-11.886-6.194-4.973-2.749-8.234-4.552-10.276-4.27-5.969.823-4.236 6.315-2.661 11.304 1.069 3.389 2.066 6.546.523 7.848-1.614 1.364-6.842-3.621-12.951-9.445-8.316-7.929-18.264-17.414-22.955-14.565-3.709 2.253-.108 8.364 4.3 15.844l.327.555c1.862 3.162 4.02 6.382 5.989 9.32 4.003 5.971 7.227 10.783 5.614 11.597-1.95.984-15.536-8.186-26.985-20.917-4.419-4.913-8.699-10.239-12.677-15.188v-.001c-8.707-10.834-15.961-19.859-20.033-18.79-4.898 1.286-1.193 11.39 4.252 21.113 2.546 4.547 5.541 9.177 8.134 13.186v.001c4.033 6.234 7.094 10.965 5.984 11.547-1.498.783-14.679-12.07-23.632-28.267-5.317-9.621-9.782-20.253-13.397-28.86-3.92-9.335-6.84-16.288-8.763-16.988-6.68-2.431-6.68 11.19-4.001 30.849.35 2.565.87 5.255 1.51 7.994C96.308 450.785 176.129 512 270.568 512c115.517 0 209.161-91.588 209.161-204.568 0-107.532-84.829-195.685-192.608-203.938.136-5.066 2.78-15.111 2.78-15.111s19.027-46.036 20.033-55.873c.066-.653.145-1.362.23-2.118C311.348 19.762 313.553 0 296.551 0c-9.08 0-13.302 6.755-18.131 14.48-1.854 2.966-3.798 6.075-6.14 8.999-16.868 21.065-45.232 47.37-61.315 61.384-33.994 29.621-67.346 53.965-86.798 68.163l-.001.001c-8.847 6.457-14.818 10.816-16.666 12.617-13.926 13.576-63.858 103.642-63.858 103.642s-16.148 28.896-10.408 34.757c5.74 5.86 19.58 4.517 19.58 4.517s185.941-42.657 202.588-46.021a262.52 262.52 0 0110.075-1.83c6.595-1.089 7.779-1.285 15.225-5.828zm-131.467-54.817c-9.981 9.487-26.534 32.132-26.534 32.132s30.764 1.895 47.707-14.21c16.944-16.106 13.062-43.553 13.062-43.553s-24.255 16.144-34.235 25.631z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Electric: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="electric"
        fillRule="evenodd"
        d="M152.56.584a.44.44 0 01.416-.584h179.829a.44.44 0 01.421.31l82.598 266.861a.44.44 0 01-.421.57H295.684a.22.22 0 00-.211.28l68.662 241.705c.134.469-.481.775-.774.385L96.529 155.267a.44.44 0 01.352-.704h108.655a.22.22 0 00.207-.292L152.56.584z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Fire: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="fire"
        fillRule="evenodd"
        d="M352.258 395.394c6.326-23.131-5.953-70.684-5.953-70.684s-8.906 38.739-22.822 53.057c-11.872 12.213-26.417 20.684-47.277 22.91 17.055-8.284 28.784-25.557 28.784-45.522 0-28.026-23.112-50.746-51.622-50.746s-51.623 22.72-51.623 50.746a49.84 49.84 0 004.812 21.421c-17.832-14.206-20.636-36.982-20.636-36.982s-19.912 82.67 34.954 121.558c54.865 38.888 162.344 5.462 162.344 5.462S229.41 574.837 115.436 457.05c-98.18-101.466-25.625-235.047-25.625-235.047s-3.133 12.392-3.133 26.777c0 14.385 7.799 25.33 7.799 25.33s23.265-49.039 41.371-68.982c17.136-18.874 38.617-34.182 57.171-47.404 14.282-10.178 26.83-19.12 34.324-27.501C268.62 84.069 243.311 0 243.311 0s46.53 41.02 59.52 93.998c4.952 20.194 1.766 43.171-1.082 63.718-4.624 33.356-8.361 60.309 25.044 58.56 53.982-2.827 7.073-86.053 7.073-86.053s122.452 64.36 113.304 176.922c-9.149 112.562-133.846 138.152-133.846 138.152s32.607-26.772 38.934-49.903z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Fighting: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="fighting"
        fillRule="evenodd"
        d="M88.234 42.566C94.43 18.1 116.593 0 142.983 0c19.795 0 37.212 10.185 47.296 25.6h16.513c10.259-10.528 24.592-17.067 40.453-17.067 23.254 0 43.226 14.055 51.884 34.134h13.825c8.663-5.409 18.899-8.534 29.864-8.534 23.255 0 43.226 14.055 51.884 34.134h37.595c.321 0 .622.086.881.237a57.205 57.205 0 015.213-.237c31.191 0 56.475 25.284 56.475 56.475v169.344l.001.314-.001.314v2.439c0 1.033-.028 2.062-.084 3.086C491.384 417.717 385.749 512 255.933 512 123.974 512 17 414.577 17 294.4c0-58.009 24.925-110.717 65.553-149.725-.1 56.553.854 115.019 5.258 114.016 11.79-2.688 2.578-177.851.423-216.125z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Fairy: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="fairy"
        fillRule="evenodd"
        d="M102.726 405.978l82.122-23.812 70.93 129.691a.243.243 0 00.426 0l70.93-129.691 82.123 23.812a.243.243 0 00.3-.302l-23.816-80.497 126.115-68.975a.242.242 0 00.001-.425l-127.155-69.544 24.855-84.01a.243.243 0 00-.3-.302l-84.049 24.371L256.204.126a.242.242 0 00-.425 0l-69.004 126.168-84.049-24.371a.243.243 0 00-.3.302l24.855 84.01L.126 255.779a.242.242 0 000 .425l126.115 68.975-23.815 80.497a.243.243 0 00.3.302zm63.726-149.102l58.179 31.819 31.819 58.178a.242.242 0 00.426 0l31.819-58.178 58.178-31.819a.243.243 0 000-.426l-58.178-31.819-31.819-58.178a.242.242 0 00-.426 0l-31.819 58.178-58.179 31.819a.243.243 0 000 .426z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Flying: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="flying"
        fillRule="evenodd"
        d="M178.712 477.733c75.003 0 139.215-41.685 165.724-100.777.324-.721-106.429 27.743-103.025 17.681 1.52-4.493 66.96-28.399 114.637-56.283 27.403-16.027 40.022-49.954 40.022-49.954s-46.167 22.415-69.506 28.101c-47.032 11.46-88.433 10.226-88.433 9.032 0-2.582 68.745-15.644 164.293-73.869 44.943-27.387 57.15-74.561 57.15-74.561s-49.411 29.432-79.281 39.149c-70.836 23.043-135.478 29.987-135.478 26.869 0-6.676 56.887-22.319 117.201-51.544 31.36-15.195 58.519-35.047 89.992-57.124C503.506 98.332 511.999 34 511.999 34s-50.792 32.76-75.579 43.64c-102.279 44.891-192.591 68.439-257.708 73.537C80.416 158.873 0 227.456 0 316.501c0 89.046 80.012 161.232 178.712 161.232z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Ghost: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="ghost"
        fillRule="evenodd"
        d="M368.952 510.227c-46.183 2.364-99.056 2.364-117.024 0C111.77 491.788 0 389.313 0 250.8 0 112.287 114.615 0 256 0s256 112.287 256 250.8c0 64.421-24.793 123.169-65.54 167.587-11.065 12.061 4.117 20.521 19.542 29.117 15.128 8.431 30.49 16.992 21.562 29.208-9.838 13.461-63.172 30.677-118.612 33.515zM220 219.45c0 21.642-17.909 39.187-40 39.187s-40-17.545-40-39.187c0-14.515 8.055-27.186 20.024-33.959.689 18.871 16.205 33.958 35.245 33.958H220v.001zm123.976-33.959c-.689 18.871-16.205 33.958-35.245 33.958H284v.001c0 21.642 17.909 39.187 40 39.187s40-17.545 40-39.187c0-14.515-8.055-27.186-20.024-33.959z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Grass: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="grass"
        fillRule="evenodd"
        d="M97.412 440.649a236.849 236.849 0 01-5.213-5.056c-90.685-90.684-90.685-237.713 0-328.397 90.684-90.685 379.64-96.752 379.64-96.752s39.442 334.465-51.242 425.149c-80.54 80.54-205.522 89.55-296.005 27.031l72.908-89.471 116.55-25.163-95.139-9.511 60.462-61.562 68.824-15.077-54.422-16.117 54.422-98.176-77.41 86.828-29.893-42.183 10.523 69.648-53.917 60.782-24.993-76.9V347.99z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Poison: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="poison"
        fillRule="evenodd"
        d="M427.821 393.449C479.524 352.108 512 292.376 512 225.95 512 101.161 397.385 0 256 0S0 101.161 0 225.95c0 64.028 30.174 121.836 78.655 162.951-2.938 10.145-4.55 21.18-4.55 32.719 0 49.915 30.162 90.38 67.369 90.38 24.176 0 45.378-17.085 57.263-42.746C210.622 494.915 231.824 512 256 512c22.038 0 41.604-14.196 53.895-36.143C322.186 497.804 341.752 512 363.789 512c37.207 0 67.369-40.465 67.369-90.38 0-9.836-1.172-19.306-3.337-28.171zm-23.61-163.018c0 63.354-67.865 114.713-151.579 114.713-83.715 0-151.579-51.359-151.579-114.713 0-63.354 67.864-114.713 151.579-114.713 83.714 0 151.579 51.359 151.579 114.713z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Steel: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="steel"
        fillRule="evenodd"
        d="M.051 254.527a.373.373 0 010-.377L128.795 34.184a.374.374 0 01.322-.184h255.177c.133 0 .256.07.323.186l127.332 219.966a.371.371 0 010 .373L384.617 474.244a.374.374 0 01-.323.186H129.117a.374.374 0 01-.322-.184L.051 254.527zm374.566-.312c0 65.488-53.089 118.577-118.577 118.577s-118.577-53.089-118.577-118.577c0-65.489 53.089-118.577 118.577-118.577s118.577 53.088 118.577 118.577z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Ground: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="ground"
        fillRule="evenodd"
        d="M112.764 439.754a.201.201 0 01-.19-.268L243.289 70.134a.202.202 0 01.19-.134h139.542c.085 0 .162.054.19.135l128.776 369.352a.201.201 0 01-.19.267H112.764zM.201 441.199a.2.2 0 01-.188-.271l97.34-259.872a.201.201 0 01.188-.131h84.577c.14 0 .237.139.189.27L88.182 441.067a.201.201 0 01-.189.132H.201z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Rock: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="rock"
        fillRule="evenodd"
        d="M395.138 244.757a.186.186 0 01-.033-.139l32.664-190.466a.183.183 0 01.18-.152h10.338c.08 0 .15.052.174.128l73.59 233.003a.183.183 0 01-.062.199l-54.259 42.363a.182.182 0 01-.259-.036l-62.333-84.9zM-1 371.022c0 .079.05.149.126.174l111.849 36.571a.184.184 0 00.161-.023l250.009-172.6a.182.182 0 00.077-.124l26.81-179.892a.182.182 0 00-.18-.21H166.406a.183.183 0 00-.141.067L-.958 256.714a.183.183 0 00-.042.117v114.191zm158.583 46.063l122.193 40.027a.182.182 0 00.163-.025l145.479-104.353a.182.182 0 00.046-.25l-54.536-81.155a.182.182 0 00-.255-.049l-213.09 145.805z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Normal: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="normal"
        fillRule="evenodd"
        d="M481 256c0 124.264-100.736 225-225 225S31 380.264 31 256 131.736 31 256 31s225 100.736 225 225zm-96.429 0c0 71.008-57.563 128.571-128.571 128.571S127.429 327.008 127.429 256 184.992 127.429 256 127.429 384.571 184.992 384.571 256z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Ice: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <g id="ice" fillRule="evenodd" clipRule="evenodd">
        <path d="M384.304 39.042l1.575 138.35-120.67 57.927-1.488-130.629 120.583-65.648zM505.269 257.047l-119.455 68.327-119.526-68.435 119.464-62.752 119.517 62.86zM245.04 257.047l-119.455 68.327L6.059 256.939l119.464-62.752 119.517 62.86zM124.243 38.475l123.986 61.406-3.17 133.816-117.066-57.978-3.75-137.244zM387.678 473.525l-123.986-61.406 3.17-133.817 117.066 57.979 3.75 137.244zM128.525 474.77l-1.576-138.35 120.671-57.927 1.488 130.628-120.583 65.649z" />
      </g>
    </svg>
  ),
  Psychic: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="psychic"
        fillRule="evenodd"
        d="M455.925 425.184s-64.56 51.779-193.032 30.352c-97.47-16.257-149.456-123.703-149.456-181.457 0-136.93 101.346-168.091 169.863-168.091 68.516 0 113.213 66.8 113.213 118.52s-36.58 96.958-93.507 96.958c-56.926 0-73.786-39.965-73.786-76.708 0-36.742 29.727-49.687 56.838-49.687s36.394 23.146 36.394 43.039c0 19.894-15.435 27.018-28.309 27.018s-14.147-6.495-19.074-13.321c-4.928-6.825 6.284-32.661-12.176-32.661s-21.901 29.701-21.901 29.701 6.73 57.333 62.014 56.344c55.285-.99 81.512-43.73 73.89-86.045-7.622-42.316-48.689-87.281-120.763-78.195-72.074 9.086-101.501 81.91-88.53 159.734 12.971 77.825 106.204 122.917 179.509 106.694 73.306-16.223 146.317-69.293 146.317-203.846 0-134.554-116.533-215.433-255.488-202.104C98.986 14.76 12.729 136.242 18.251 282.207c5.52 145.965 144.024 225.462 261.143 229.559 117.119 4.098 188.918-63.699 188.918-63.699s16.147-14.399 9.816-25.643c-6.33-11.244-22.203 2.76-22.203 2.76z"
        clipRule="evenodd"
      />
    </svg>
  ),
  Water: props => (
    <svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <path
        id="water"
        fillRule="evenodd"
        d="M422.172 346.515c0 91.382-74.359 165.462-166.086 165.462C164.359 511.977 90 437.897 90 346.515 90 257.639 247.102 13.548 255.718.228c.197-.304.54-.304.736 0 8.616 13.32 165.718 257.411 165.718 346.287zM228.4 458.931c-84.28-18.441-69.858-111.801-69.858-111.801s23.014 56.358 78.863 74.614c55.848 18.255 123.34-8.519 123.34-8.519S312.68 477.371 228.4 458.931z"
        clipRule="evenodd"
      />
    </svg>
  ),
  status: props => (
    <svg width={108} height={109} viewBox="0 0 108 109" {...props}>
      <g id="status" fillRule="evenodd" stroke="none">
        <g id="moves-categories" transform="translate(-51 -228)">
          <path d="M105 336.57c-29.823 0-54-24.176-54-54 0-29.823 24.177-54 54-54s54 24.177 54 54c0 29.824-24.177 54-54 54zm7.792-12.36c20.061-3.3 35.365-20.722 35.365-41.718 0-23.351-18.93-42.281-42.282-42.281h-.391c-11.676 0-21.14 9.465-21.14 21.14 0 11.676 9.464 21.141 21.14 21.141.13 0 .261 0 .391-.003v.011c.195-.005.391-.008.588-.008 11.783 0 21.336 9.553 21.336 21.337 0 9.58-6.314 17.685-15.007 20.382z" />
        </g>
      </g>
    </svg>
  ),
  special: props => (
    <svg width={109} height={109} viewBox="0 0 109 109" {...props}>
      <g fillRule="evenodd">
        <g id="moves-categories" transform="translate(-349 -228)">
          <path
            id="special"
            d="M403.93 336.57c-29.824 0-54-24.176-54-54 0-29.823 24.176-54 54-54 29.823 0 54 24.177 54 54 0 29.824-24.177 54-54 54zm0-13c22.643 0 41-18.356 41-41 0-22.643-18.357-41-41-41-22.644 0-41 18.357-41 41 0 22.644 18.356 41 41 41zm0-11c-16.569 0-30-13.431-30-30 0-16.568 13.431-30 30-30 16.568 0 30 13.432 30 30 0 16.569-13.432 30-30 30zm0-9c11.598 0 21-9.402 21-21s-9.402-21-21-21-21 9.402-21 21 9.402 21 21 21zm0-9c-6.628 0-12-5.372-12-12 0-6.627 5.372-12 12-12 6.627 0 12 5.373 12 12 0 6.628-5.373 12-12 12z"
          />
        </g>
      </g>
    </svg>
  ),
  physical: props => (
    <svg width={109} height={109} viewBox="0 0 109 109" {...props}>
      <g id="physical" fillRule="evenodd">
        <g id="moves-categories" transform="translate(-203 -228)">
          <path
            d="M257.570312 306.044643L236.905407 332.459807 240.971454 299.169171 207.680818 303.235218 234.095982 282.570313 207.680818 261.905407 240.971454 265.971454 236.905407 232.680818 257.570312 259.095982 278.235218 232.680818 274.169171 265.971454 307.459807 261.905407 281.044643 282.570313 307.459807 303.235218 274.169171 299.169171 278.235218 332.459807z"
            transform="rotate(23 257.57 282.57)"
          />
        </g>
      </g>
    </svg>
  ),
  female: props => (
    <svg width={77} height={107} viewBox="0 0 77 107" {...props}>
      <g id="gender-female" fillRule="evenodd">
        <g transform="translate(-218 -385)">
          <path
            id="female"
            d="M262.293 460.781v8.804h12.584v12h-12.584v10.416h-12v-10.416h-13.416v-12h13.416v-8.87a37.827 37.827 0 01-20.663-10.622c-14.84-14.84-14.84-38.9 0-53.74 14.84-14.84 38.9-14.84 53.74 0 14.84 14.84 14.84 38.9 0 53.74a37.83 37.83 0 01-21.077 10.688zm-22.764-54.529c-9.372 9.373-9.372 24.569 0 33.941 9.373 9.373 24.569 9.373 33.942 0 9.372-9.372 9.372-24.568 0-33.94-9.373-9.373-24.569-9.373-33.942 0z"
          />
        </g>
      </g>
    </svg>
  ),
  male: props => (
    <svg width={96} height={95} viewBox="0 0 96 95" {...props}>
      <g id="gender-male" fillRule="evenodd">
        <g transform="translate(-56 -393)">
          <path
            id="male"
            d="M124.832 426.121a37.834 37.834 0 017.826 23.103c0 20.986-17.013 38-38 38s-38-17.014-38-38c0-20.987 17.013-38 38-38 8.328 0 16.03 2.679 22.292 7.222l16.595-15.594h-17.203V393h35v35h-9.852v-17.537l-16.658 15.658zm-30.174 47.103c13.255 0 24-10.746 24-24 0-13.255-10.745-24-24-24s-24 10.745-24 24c0 13.254 10.745 24 24 24z"
          />
        </g>
      </g>
    </svg>
  ),
  restore: props => (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
    </svg>
  ),
  eggColor: props => (
    <svg width={24} height={24} viewBox="0 0 77 100" {...props}>
    <defs>
        <linearGradient x1="19.0457755%" y1="-30.9044471%" x2="68.099807%" y2="100%" id="linearGradient-1">
            <stop stop-color="#6A7C97" offset="0%"></stop>
            <stop stop-color="#2C3444" offset="100%"></stop>
        </linearGradient>
    </defs>
      <path d="M39.8785373,97.2236111 C19.6376253,97.2236111 3.22912418,80.8151099 3.22912418,60.574198 C3.22912418,40.3332861 19.6376253,2.22361108 39.8785373,2.22361108 C60.1194492,2.22361108 76.5279503,40.3332861 76.5279503,60.574198 C76.5279503,80.8151099 60.1194492,97.2236111 39.8785373,97.2236111 Z"></path>
      <path fill="url(#linearGradient-1)" d="M38.1925463,99 C17.0993854,99 1.42108547e-14,81.9006146 1.42108547e-14,60.8074537 C1.42108547e-14,39.7142929 17.0993854,0 38.1925463,0 C59.2857071,0 76.3850925,39.7142929 76.3850925,60.8074537 C76.3850925,81.9006146 59.2857071,99 38.1925463,99 Z M14.1254011,61.6172381 C18.4481405,62.6152212 23.5048668,56.6998311 25.4199154,48.4048445 C27.3349639,40.109858 26.6180775,30.2201799 22.295338,29.2221968 C17.9725986,28.2242138 11.6809396,36.4958417 9.76589103,44.7908283 C7.8508425,53.0858148 9.80266163,60.6192551 14.1254011,61.6172381 Z M50.3374502,86.7055785 C57.9637236,86.0383661 63.4428924,77.4604726 62.5755162,67.5463172 C61.70814,57.6321618 54.8226765,50.1360334 47.1964031,50.8032459 C39.5701298,51.4704584 34.090961,60.0483519 34.9583372,69.9625073 C35.8257134,79.8766626 42.7111769,87.372791 50.3374502,86.7055785 Z M57.6237943,35.1745693 C60.5339827,34.3382977 62.2174422,31.7622503 60.2334783,27.0883243 C58.2495144,22.4143982 53.6190699,18.5297258 51.1847336,19.5630403 C48.7503973,20.5963548 48.6261401,26.1052271 50.7284819,31.058034 C52.8308236,36.0108409 54.7136058,36.0108409 57.6237943,35.1745693 Z"></path>
    </svg>
  ),
  tutor: props => (
    <svg width={96} height={95} viewBox="0 0 96 95" {...props}>
      <path d="M24.0175141,41.3903479 L54.3507635,53.3075205 L84.6840129,41.3903479 L84.6840129,72.737525 L84.4759961,72.737525 C82.7085907,78.7361013 69.8951274,83.3903479 54.3507635,83.3903479 C38.8063996,83.3903479 25.9929363,78.7361013 24.2255309,72.737525 L24.0175141,72.737525 L24.0175141,41.3903479 Z M55.0395677,0.12235554 L107.389796,19.3267682 C108.42679,19.7071842 108.959052,20.8562225 108.578636,21.8932169 C108.381721,22.4299958 107.964486,22.8568316 107.432325,23.0659044 L55.0820969,43.6329953 C54.6120295,43.817673 54.0894975,43.817673 53.6194301,43.6329953 L1.26920217,23.0659044 C0.241128676,22.6620001 -0.264860448,21.5011527 0.139043832,20.4730792 C0.348116609,19.940918 0.774952412,19.5236828 1.31173132,19.3267682 L53.6619592,0.12235554 C54.1066723,-0.04078518 54.5948546,-0.04078518 55.0395677,0.12235554 Z"></path>
    </svg>
  ),
  machine: props => (
    <svg width={96} height={95} viewBox="0 0 96 95" {...props}>
      <path d="M28.0553214,21 L72.0553214,21 C75.9213146,21 79.0553214,24.1340068 79.0553214,28 L79.0553214,72 C79.0553214,75.8659932 75.9213146,79 72.0553214,79 L28.0553214,79 C24.1893281,79 21.0553214,75.8659932 21.0553214,72 L21.0553214,28 C21.0553214,24.1340068 24.1893281,21 28.0553214,21 Z M37.4995327,85.106383 L37.4995327,94.8598131 C37.4995327,97.6986599 35.1981926,100 32.3593458,100 C29.5204989,100 27.2191589,97.6986599 27.2191589,94.8598131 L27.2191589,85.106383 L37.4995327,85.106383 L37.4995327,85.106383 Z M14.9384907,72.7808411 L5.14018692,72.7808411 C2.30134007,72.7808411 -7.10542736e-15,70.4795011 -7.10542736e-15,67.6406542 C-7.10542736e-15,64.8018074 2.30134007,62.5004673 5.14018692,62.5004673 L14.9384907,62.5004673 L14.9384907,72.7808411 Z M14.9384907,55.1401869 L5.14018692,55.1401869 C2.30134007,55.1401869 -7.10542736e-15,52.8388468 -7.10542736e-15,50 C-7.10542736e-15,47.1611532 2.30134007,44.8598131 5.14018692,44.8598131 L14.9384907,44.8598131 L14.9384907,55.1401869 L14.9384907,55.1401869 Z M14.9384907,37.4995327 L5.14018692,37.4995327 C2.30134007,37.4995327 -7.10542736e-15,35.1981926 -7.10542736e-15,32.3593458 C-7.10542736e-15,29.5204989 2.30134007,27.2191589 5.14018692,27.2191589 L14.9384907,27.2191589 L14.9384907,37.4995327 L14.9384907,37.4995327 Z M27.2191589,14.893617 L27.2191589,5.14018692 C27.2191589,2.30134007 29.5204989,1.42108547e-14 32.3593458,1.42108547e-14 C35.1981926,1.42108547e-14 37.4995327,2.30134007 37.4995327,5.14018692 L37.4995327,14.893617 L27.2191589,14.893617 Z M44.8598131,14.893617 L44.8598131,5.14018692 C44.8598131,2.30134007 47.1611532,7.10542736e-13 50,7.10542736e-13 C52.8388468,7.10542736e-13 55.1401869,2.30134007 55.1401869,5.14018692 L55.1401869,14.893617 L44.8598131,14.893617 L44.8598131,14.893617 Z M62.5004673,14.893617 L62.5004673,5.14018692 C62.5004673,2.30134007 64.8018074,1.64135372e-12 67.6406542,1.64135372e-12 C70.4795011,1.64135372e-12 72.7808411,2.30134007 72.7808411,5.14018692 L72.7808411,14.893617 L62.5004673,14.893617 Z M85.1512566,27.2191589 L94.8598131,27.2191589 C97.6986599,27.2191589 100,29.5204989 100,32.3593458 C100,35.1981926 97.6986599,37.4995327 94.8598131,37.4995327 L85.1512566,37.4995327 L85.1512566,27.2191589 L85.1512566,27.2191589 Z M85.1512566,44.8598131 L94.8598131,44.8598131 C97.6986599,44.8598131 100,47.1611532 100,50 C100,52.8388468 97.6986599,55.1401869 94.8598131,55.1401869 L85.1512566,55.1401869 L85.1512566,44.8598131 L85.1512566,44.8598131 Z M85.1512566,62.5004673 L94.8598131,62.5004673 C97.6986599,62.5004673 100,64.8018074 100,67.6406542 C100,70.4795011 97.6986599,72.7808411 94.8598131,72.7808411 L85.1512566,72.7808411 L85.1512566,62.5004673 Z M72.7808411,85.106383 L72.7808411,94.8598131 C72.7808411,97.6986599 70.4795011,100 67.6406542,100 C64.8018074,100 62.5004673,97.6986599 62.5004673,94.8598131 L62.5004673,85.106383 L72.7808411,85.106383 Z M55.1401869,85.106383 L55.1401869,94.8598131 C55.1401869,97.6986599 52.8388468,100 50,100 C47.1611532,100 44.8598131,97.6986599 44.8598131,94.8598131 L44.8598131,85.106383 L55.1401869,85.106383 L55.1401869,85.106383 Z"></path>
    </svg>
  ),
  'level-up': props => (
    <svg width={96} height={95} viewBox="0 0 96 95" {...props}>
      <path d="M9,0 L80.902439,0 C85.8730018,0 89.902439,4.02943725 89.902439,9 L89.902439,67 C89.902439,71.9705627 85.8730018,76 80.902439,76 L9,76 C4.02943725,76 -7.10542736e-15,71.9705627 -7.10542736e-15,67 L-7.10542736e-15,9 C-7.10542736e-15,4.02943725 4.02943725,0 9,0 Z M13.7691308,61.8658537 L33.7738138,61.8658537 L33.7738138,55.1537561 L20.4812284,55.1537561 L20.4812284,15.0127805 L13.7691308,15.0127805 L13.7691308,61.8658537 Z M55.3244479,15.0127805 L48.2175211,15.0127805 L42.8215211,47.7178049 L42.6899113,47.7178049 L37.3597162,15.0127805 L30.2527894,15.0127805 L39.7944967,61.8658537 L45.7169357,61.8658537 L55.3244479,15.0127805 Z M59.3385455,61.8658537 L79.3432284,61.8658537 L79.3432284,55.1537561 L66.050643,55.1537561 L66.050643,15.0127805 L59.3385455,15.0127805 L59.3385455,61.8658537 Z"></path>
    </svg>
  ),
  egg: props => (
    <svg width={96} height={95} viewBox="0 0 96 95" {...props}>
      <path d="M38.1925463,99 C17.0993854,99 1.42108547e-14,81.9006146 1.42108547e-14,60.8074537 C1.42108547e-14,39.7142929 17.0993854,0 38.1925463,0 C59.2857071,0 76.3850925,39.7142929 76.3850925,60.8074537 C76.3850925,81.9006146 59.2857071,99 38.1925463,99 Z M14.1254011,61.6172381 C18.4481405,62.6152212 23.5048668,56.6998311 25.4199154,48.4048445 C27.3349639,40.109858 26.6180775,30.2201799 22.295338,29.2221968 C17.9725986,28.2242138 11.6809396,36.4958417 9.76589103,44.7908283 C7.8508425,53.0858148 9.80266163,60.6192551 14.1254011,61.6172381 Z M50.3374502,86.7055785 C57.9637236,86.0383661 63.4428924,77.4604726 62.5755162,67.5463172 C61.70814,57.6321618 54.8226765,50.1360334 47.1964031,50.8032459 C39.5701298,51.4704584 34.090961,60.0483519 34.9583372,69.9625073 C35.8257134,79.8766626 42.7111769,87.372791 50.3374502,86.7055785 Z M57.6237943,35.1745693 C60.5339827,34.3382977 62.2174422,31.7622503 60.2334783,27.0883243 C58.2495144,22.4143982 53.6190699,18.5297258 51.1847336,19.5630403 C48.7503973,20.5963548 48.6261401,26.1052271 50.7284819,31.058034 C52.8308236,36.0108409 54.7136058,36.0108409 57.6237943,35.1745693 Z"></path>
    </svg>
  ),
};

export const Icons = props => icons[props.icon](props);

Icons.propTypes = {
  icon: PropTypes.string.isRequired
};
