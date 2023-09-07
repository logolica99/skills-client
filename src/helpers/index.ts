import jwtDecode from "jwt-decode";
import CryptoJS from "crypto-js";

export const checkTokenValidity = (token: any) => {
  return jwtDecode<any>(token).name.length > 0 ? true : false;
};

export const isLoggedIn = () => {
  let token: string = "";
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token") || "";
  }

  if (!token || !checkTokenValidity(token)) {
    return false;
  }
  return true;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

export function capitalizeFirstWord(str: String) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
let token: string = "";
if (typeof window !== "undefined") {
  // Perform localStorage action
  token = localStorage.getItem("token") || "";
}

export const apiConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export function englishToBanglaNumbers(number: number) {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const englishNumberStr = number.toString();
  const banglaNumberStr = englishNumberStr
    .split("")
    .map((digit) => banglaDigits[parseInt(digit)])
    .join("");

  return banglaNumberStr;
}

export function calculateRemainingDays(targetDate: string) {
  // Parse the target date string into a Date object
  const target = new Date(targetDate).getTime();

  // Get the current date
  const currentDate = new Date().getTime();

  // Calculate the difference in milliseconds between the two dates
  const timeDifference = target - currentDate;

  // Calculate the remaining days
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return remainingDays;
}
export function countAssignmentsAndVideos(data: any) {
  let assignmentCount = 0;
  let videoCount = 0;

  data.forEach((item: any) => {
    if (item.data.category === "ASSIGNMENT") {
      assignmentCount++;
    } else if (item.data.category === "VIDEO") {
      videoCount++;
    }
  });

  return {
    assignmentCount,
    videoCount,
  };
}

export function countModulesAssignmentsVideos(data: any) {
  let totalModules = 0;
  let totalAssignments = 0;
  let totalVideos = 0;

  for (const chapter of data.chapters) {
    for (const elem of chapter.modules) {
      if (elem.data.category === "VIDEO") {
        totalVideos++;
      } else if (elem.data.category === "ASSIGNMENT") {
        totalAssignments++;
      }
      totalModules++;
    }
  }

  return {
    totalModules,
    totalAssignments,
    totalVideos,
  };
}

export function decryptString(encryptedText: any, secretKey: any) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}
