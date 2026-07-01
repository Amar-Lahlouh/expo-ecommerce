import ImageKit from "imagekit-javascript";

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:4000/imagekit/auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }
    const data = await response.json();

    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

/**
 *
 * @param {string} uri image uri
 * @param {string} name image name
 * @param {string} folder  image folder
 * @returns
 */
const uploadFile = async function (file, name, folder = undefined) {
  const res = await authenticator();
  var imagekit = new ImageKit({
    publicKey: "public_8laFL/hcXRshyslH4aJIeRLB4lk=",
    urlEndpoint: "https://ik.imagekit.io/amar",
    authenticationEndpoint: "http://localhost:5000/imagekit/auth",
  });
  const filePayload = {
    file,
    name,
    type: file.type,
  };
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file,
        fileName: filePayload.name,
        folder,
        ...res,
      },
      function (err, result) {
        if (err) reject(err);
        resolve(result);
      },
    );
  });
};

export default uploadFile;
