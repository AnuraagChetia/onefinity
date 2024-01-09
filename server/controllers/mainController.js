const PDFExtract = require("pdf.js-extract").PDFExtract;
const User = require("../model/user");

exports.resume = async (req, res) => {
  try {
    const pdfExtract = new PDFExtract();
    const options = {};
    pdfExtract.extract(req.file.path, options, async (err, data) => {
      if (err) return console.log(err);
      const githubRegex = /github\.com/gi;
      const emailRegex = /gmail\.com/gi;
      const skillRegex = /\b(?:HTML|CSS|JavaScript|ReactJs)\b/gi; // modfiy depending upon requirement

      const github = data.pages[0].links.find((link) =>
        link.match(githubRegex)
      );

      const email = data.pages[0].links
        .find((link) => link.match(emailRegex))
        .slice(7);
      const skills = [];
      data.pages[0].content.forEach((data) => {
        if (data.str.match(skillRegex)) {
          skills.push(data.str);
        }
      });

      //add email and skills and github links to user model
      const user = await User.create({
        email: email,
        github: github,
        skills: skills,
      });
      console.log(user);

      return res.status(200).json({
        success: true,
        github: github,
        skills: skills,
        email: email,
        data: data,
      });
    });
    // res.status(200).json({ success: true, data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong !" });
  }
};

// data.pages[0].links; // get all links
// data.pages[0].content[0].str; // has all the content
