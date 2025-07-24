import logo from '@/assets/logo.png';
import { Facebook, Instagram, X, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
    { href: 'https://www.facebook.com/mdkhaledsshuvo', icon: Facebook },
    { href: 'https://www.instagram.com/mdkhaledsshuvo', icon: Instagram },
    { href: 'https://x.com/mdkhaledsshuvo', icon: X },
    { href: 'https://www.linkedin.com/in/mdkhaledsshuvo', icon: Linkedin },
  ];
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo & site-name */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-medium flex items-center">
              <Image
                src={logo}
                alt="Logo Image"
                className="h-10 w-10 object-contain"
              />
              <h1>
                <span className="text-primary">Word</span>Pulse
              </h1>
            </Link>
          </div>
          <p className="text-gray-600 mt-3 md:w-1/2 text-xs leading-6">
            ✍️ Share your voice with WordPulse Articles! 📰 Publish your
            stories, tips, and insights—fast, easy, and free. Connect with
            readers who care about what you share. Don’t miss out—start sharing
            today!
          </p>
        </div>

        <hr />

        <div className="flex justify-center space-x-4 mt-6">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 transition-all duration-300 ease-in-out transform hover:bg-white hover:scale-150 hover:border hover:border-white cursor-pointer"
            >
              <Icon className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors duration-300 ease-in-out" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
