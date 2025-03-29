import { useEffect, useRef, useState } from "react";
import "../styles/contact.css";

function Contact() {
	const sectionRef = useRef(null);
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [formStatus, setFormStatus] = useState(null);

	useEffect(() => {
		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.1,
		};

		const handleIntersect = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target);
				}
			});
		};

		const observer = new IntersectionObserver(
			handleIntersect,
			observerOptions
		);

		if (sectionRef.current) {
			const animatedElements =
				sectionRef.current.querySelectorAll(".animate");
			animatedElements.forEach((el) => observer.observe(el));
		}

		return () => {
			if (sectionRef.current) {
				const animatedElements =
					sectionRef.current.querySelectorAll(".animate");
				animatedElements.forEach((el) => observer.unobserve(el));
			}
		};
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// This would be replaced with actual form submission logic
		// For demo purposes, we're just showing a success message
		setFormStatus("success");

		// Reset form after delay
		setTimeout(() => {
			setFormState({
				name: "",
				email: "",
				message: "",
			});
			setFormStatus(null);
		}, 3000);
	};

	const socialLinks = [
		{
			name: "GitHub",
			icon: "github.svg",
			url: "https://github.com/bhumir2503",
			delay: 0.1,
		},
		{
			name: "LinkedIn",
			icon: "linkedin.svg",
			url: "https://linkedin.com/in/bhumir-patel",
			delay: 0.2,
		},
		{
			name: "Discord",
			icon: "discord.svg",
			url: "https://discordapp.com/users/418762004849754112",
			delay: 0.3,
		},
		{
			name: "WhatsApp",
			icon: "whatsapp.svg",
			url: "https://wa.me/18653164371",
			delay: 0.4,
		},
		{
			name: "Email",
			icon: "email.svg",
			url: "mailto:Bhumir2503@gmail.com",
			delay: 0.5,
		},
	];

	return (
		<section id="contact" className="contact" ref={sectionRef}>
			<div className="container contact-container">
				<div className="section-header animate">
					<h2 className="section-title">Get In Touch</h2>
					<div className="section-subtitle">Let's work together</div>
				</div>

				<div className="contact-content">
					<div className="contact-info animate">
						<h3 className="contact-info-title">
							Contact Information
						</h3>

						<div className="contact-info-item">
							<i className="icon-email"></i>
							<div>
								<h4>Email</h4>
								<a href="mailto:Bhumir2503@gmail.com">
									Bhumir2503@gmail.com
								</a>
							</div>
						</div>

						<div className="contact-info-item">
							<i className="icon-location"></i>
							<div>
								<h4>Location</h4>
								<p>Knoxville, Tennessee</p>
							</div>
						</div>

						<div className="social-links">
							<h4>Connect With Me</h4>
							<div className="social-icons">
								{socialLinks.map((link, index) => (
									<a
										key={index}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="social-icon animate"
										style={{
											transitionDelay: `${link.delay}s`,
										}}
										aria-label={link.name}
									>
										<img src={link.icon} alt={link.name} />
									</a>
								))}
							</div>
						</div>
					</div>

					<div className="contact-form-container animate">
						<form className="contact-form" onSubmit={handleSubmit}>
							<div className="form-header">
								<h3>Send Me a Message</h3>
								<p>
									I'm always open to discussing new projects,
									opportunities, or partnerships.
								</p>
							</div>

							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formState.name}
									onChange={handleInputChange}
									required
									placeholder="Your Name"
									className="form-control"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formState.email}
									onChange={handleInputChange}
									required
									placeholder="Your Email"
									className="form-control"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="message">Message</label>
								<textarea
									id="message"
									name="message"
									value={formState.message}
									onChange={handleInputChange}
									required
									placeholder="Your Message"
									rows="5"
									className="form-control textarea-limited"
								></textarea>
							</div>

							<button
								type="submit"
								className={`submit-button ${
									formStatus ? formStatus : ""
								}`}
							>
								{formStatus === "success"
									? "Message Sent!"
									: "Send Message"}
								<i className="send-icon"></i>
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Contact;
