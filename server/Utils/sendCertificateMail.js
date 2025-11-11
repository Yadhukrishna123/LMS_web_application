const nodeMailer = require("nodemailer")
const pdfDocument = require("pdfkit")
const { Readable } = require("stream")


exports.sendCertificatetoStudent = async (email, courseName, studentName) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.LMS_EMAIL,
                pass: process.env.LMS_PASSWORD
            }
        })

        const doc = new pdfDocument({ size: "A4", margin: 50 })
        const buffers = [];
        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", async () => {
            const pdfData = Buffer.concat(buffers);

            const mailOptions = {
                from: `"LMS Learning" <${process.env.LMS_EMAIL}>`,
                to: email,
                subject: `Course Certificate - ${courseName}`,
                html: `
          <div style="font-family: Arial, sans-serif; color:#333;">
            <h2>Congratulations ${studentName || "Student"} 🎉</h2>
            <p>You’ve successfully completed the course:</p>
            <h3 style="color:#6d28d9;">${courseName}</h3>
            <p>Your course completion certificate is attached as a PDF.</p>
            <p>Keep learning and growing! 🚀</p>
            <hr />
            <p><strong>LMS Learning</strong></p>
          </div>
        `,
                attachments: [
                    {
                        filename: `${studentName}_Certificate.pdf`,
                        content: pdfData,
                        contentType: "application/pdf",
                    },
                ]
            }

            await transporter.sendMail(mailOptions)
            console.log("✅ Certificate email sent successfully");
        })

      const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    doc.rect(0, 0, pageWidth, pageHeight).fill("#fffdf7");

    doc.lineWidth(10)
      .strokeColor("#c5a75b")
      .rect(30, 30, pageWidth - 60, pageHeight - 60)
      .stroke();

    doc.lineWidth(2)
      .strokeColor("#1e3a5f")
      .rect(45, 45, pageWidth - 90, pageHeight - 90)
      .stroke();

   
    const cornerSize = 120;
    doc.save()
      .fillColor("#d4a574")
      .polygon(
        [45, 45],
        [45 + cornerSize, 45],
        [45, 45 + cornerSize]
      )
      .fill()
      .restore();

    doc.save()
      .fillColor("#d4a574")
      .polygon(
        [pageWidth - 45, pageHeight - 45],
        [pageWidth - 45 - cornerSize, pageHeight - 45],
        [pageWidth - 45, pageHeight - 45 - cornerSize]
      )
      .fill()
      .restore();

    
    doc.fontSize(60)
      .fillColor("#1e3a5f")
      .font("Helvetica-Bold")
      .text("CERTIFICATE", 0, 120, { align: "center", characterSpacing: 6 });

   
    doc.fontSize(22)
      .fillColor("#c5a75b")
      .font("Helvetica-Bold")
      .text("OF ACHIEVEMENT", 0, 190, { align: "center", characterSpacing: 3 });

    
    doc.moveTo(pageWidth / 2 - 100, 220)
      .lineTo(pageWidth / 2 + 100, 220)
      .lineWidth(2)
      .strokeColor("#c5a75b")
      .stroke();

   
    doc.fontSize(13)
      .fillColor("#000000")
      .font("Helvetica")
      .text("This is to proudly certify that", 0, 260, { align: "center" });

    
    doc.fontSize(42)
      .fillColor("#c89456")
      .font("Helvetica-Bold")
      .text(studentName.toUpperCase(), 0, 300, { align: "center" });

    
    const descriptionText = `has successfully completed the course\n"${courseName}"\norganized by LMS Learning, featuring structured training, project-based learning, and a focus on modern web development practices and professional skill enhancement.`;

    const leftMargin = 80;
    const rightMargin = 80;
    doc.fontSize(13)
      .fillColor("#333333")
      .font("Helvetica")
      .text(descriptionText, leftMargin, 370, {
        width: pageWidth - (leftMargin + rightMargin),
        align: "center",
        lineGap: 6,
      });

    
    doc.fontSize(11)
      .fillColor("#000")
      .font("Helvetica-Bold")
      .text(`Issued on: ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`, 0, 510, { align: "center" });

    
    const signatureY = 560;

   
    doc.moveTo(pageWidth / 2 - 100, signatureY + 40)
      .lineTo(pageWidth / 2 + 100, signatureY + 40)
      .strokeColor("#1e3a5f")
      .lineWidth(1)
      .stroke();

    doc.fontSize(14)
      .fillColor("#000")
      .font("Helvetica-Bold")
      .text("Director", 0, signatureY + 50, { align: "center" });

    doc.fontSize(10)
      .fillColor("#555")
      .font("Helvetica")
      .text("Head of Academic Affairs", 0, signatureY + 68, { align: "center" });

   
    const sealX = pageWidth / 2 + 150;
    const sealY = signatureY + 25;
    doc.circle(sealX, sealY, 40)
      .lineWidth(3)
      .strokeColor("#c5a75b")
      .stroke();

    doc.fontSize(9)
      .fillColor("#1e3a5f")
      .font("Helvetica-Bold")
      .text("LMS SEAL", sealX - 30, sealY - 6, { width: 60, align: "center" });

    
    doc.fontSize(11)
      .fillColor("#1e3a5f")
      .font("Helvetica-Bold")
      .text("Issued by LMS LEARNING", 0, pageHeight - 80, { align: "center" });

    doc.end();

    } catch (error) {
        console.error("Error sending certificate email:", error);
    }
}




















