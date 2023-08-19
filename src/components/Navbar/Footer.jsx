import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <>
      <footer className="static w-full flex flex-col bg-[#121832fd] text-[#737373] bottom-0">
        <div className="flex flex-row space-x-28 p-5">
          <div>
            <div>ABOUT</div>
            <div className="text-slate-300">
              <div className="text-xl text-yellow-400">Team Name</div>
              <div className="text-xl text-yellow-400">Proud_Mistris</div>
            </div>
          </div>

          <div>
            <div>Linkedin</div>
            <div className="text-slate-300 flex flex-col">
              <Link to="https://www.linkedin.com/in/g-anish-kumar-patro-0b97bb235/">
                <b>G.Anish Kumar Patro</b>
              </Link>
              <Link to="https://www.linkedin.com/in/sandip-parida-a51637203">
                <b>Sandip Parida</b>
              </Link>
              <Link to="https://www.linkedin.com/in/shivranjan-bharadwaj-b87b70245">
                <b>Shivranjan Bharadwaj</b>
              </Link>
            </div>
          </div>

          <div>
            <div>Address</div>
            <div className="text-slate-300 text-xl">
              <div>National Institute of Technology, Rourkela</div>
              <div>Sector-1</div>
            </div>
          </div>

          <div>
            <div>Github:</div>
            <div className="text-slate-300 flex flex-col">
              <Link to="https://github.com/anish-patro">
                <b>Anish</b>
              </Link>
              <Link to="https://github.com/sandip149">
                <b>Sandip</b>
              </Link>
              <Link to="https://github.com/shxv-69">
                <b>Shivranjan</b>
              </Link>
            </div>
          </div>
          <div>
            <div>Github:</div>
            <div className="text-slate-300 flex flex-col">
              <Link to="https://github.com/anish-patro/flipkart-grid">
                <b>Website</b>
              </Link>
            </div>
          </div>
        </div>
        <hr className="bg-slate-900 w-[99%] ml-auto mr-auto" />
        <div className="flex flex-row gap-[700px] ml-0 p-3">
          <div className="flex flex-row space-x-5">
            <div>
              <Link to="/quiz">Earn Some FLP</Link>
            </div>
            <div>
              <div>@copyrights-2023</div>
            </div>
          </div>
          <div className="flex flex-row space-x-5">
            <FaFacebook size={30} />
            <FaGithub size={30} />
            <FaLinkedin size={30} />
            <FaInstagram size={30} />
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;
