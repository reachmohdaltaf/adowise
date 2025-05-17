import { Card } from '@/components/ui/card';
import { Crown, Copy, Pencil, Plus, Trash2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const ExpertProfile = () => {
  const [copied, setCopied] = useState(false);
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const [openEditImage, setOpenEditImage] = useState(false);
  const [openEditExperience, setOpenEditExperience] = useState(false);
  const [openEditSocials, setOpenEditSocials] = useState(false);

  const [name, setName] = useState('SH. Shukla');
  const [username, setUsername] = useState('@mohd_altaf');
  const [about, setAbout] = useState(
    'I am a web developer with a passion for creating visually stunning and user-friendly websites.'
  );
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('https://randomuser.me/api/portraits/men/24.jpg');

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechNova Solutions · Full-time',
      date: 'Jan 2024 – Present · Remote',
      description: 'Building modern, responsive UIs using React, Tailwind CSS, and Next.js.',
    },
    {
      id: 2,
      title: 'Web Development Intern',
      company: 'InnovateX Labs · Internship',
      date: 'Jul 2023 – Dec 2023 · Dehradun, India',
      description: 'Worked on building and optimizing frontend features for client websites.',
    },
  ]);

  const [socials, setSocials] = useState({
    github: '',
    linkedin: '',
    twitter: '',
  });

  const expertifyLink = 'https://expertify.in/mohd_altaf';

  const handleCopy = () => {
    navigator.clipboard.writeText(expertifyLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = () => {
    setOpenEditImage(false);
  };

  const handleExperienceChange = (id, field, value) => {
    setExperiences(
      experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };
  
  const addNewExperience = () => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map(exp => exp.id)) + 1 : 1;
    setExperiences([
      ...experiences,
      {
        id: newId,
        title: '',
        company: '',
        date: '',
        description: ''
      }
    ]);
  };
  
  const removeExperience = (id) => {
    // Keep at least one experience
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const socialIcons = {
    github: <FaGithub className="w-6 h-6" />,
    linkedin: <FaLinkedin className="w-6 h-6" />,
    twitter: <FaTwitter className="w-6 h-6" />,
  };

  return (
    <div className="md:p-4">
      <p className="text-2xl font-bold mb-4">Expert Profile</p>

      <Card className="md:px-4 px-2 border-none py-6">
        <div className="flex flex-col gap-1 items-start">
          {/* Profile Image */}
          <div className="relative w-32 h-32">
            <img
              src={previewUrl}
              className="h-32 w-32 rounded-full border-4 border-primary object-cover"
              loading="lazy"
              alt="Expert Avatar"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
              <Crown className="text-primary h-6 w-6" />
            </div>
            <button
              className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow hover:bg-muted"
              onClick={() => setOpenEditImage(true)}
              title="Edit Image"
            >
              <Pencil className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Name, Username, About */}
          <div className="flex-1 px-2 mt-2 w-full">
            <div className="flex justify-between items-center gap-2">
              <h2 className="text-2xl font-semibold">{name}</h2>
              <button
                className="text-muted-foreground hover:text-primary p-1 rounded-full"
                title="Edit Profile Info"
                onClick={() => setOpenEditInfo(true)}
              >
                <Pencil className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            <p className="text-sm text-destructive">{username}</p>

            <div className="mt-1">
              <div className="flex items-center gap-2 bg-background rounded-md">
                <span className="text-sm text-muted-foreground">{expertifyLink}</span>
                <button onClick={handleCopy} className="hover:text-primary">
                  <Copy className="h-4 w-4" />
                </button>
                {copied && <span className="text-xs text-green-600 ml-2">Copied!</span>}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-1">About Me</h3>
              <p className="text-sm text-destructive">{about}</p>
            </div>

            {/* Experience */}
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold mb-2">Experience</h3>
                <button
                  onClick={() => setOpenEditExperience(true)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              
              {experiences.map((experience, index) => (
                <div key={experience.id} className={index > 0 ? "mt-4" : "mb-4"}>
                  <p className="text-sm font-bold text-muted-foreground">{experience.title}</p>
                  <p className="text-sm text-destructive">{experience.company}</p>
                  <p className="text-sm text-destructive">{experience.date}</p>
                  <p className="text-sm text-destructive mt-1">{experience.description}</p>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold mb-2">Connect with me</h3>
                <button
                  onClick={() => setOpenEditSocials(true)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-4">
                {Object.entries(socials).map(([platform, url]) => (
                  <a 
                    key={platform} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {socialIcons[platform]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Profile Info Dialog */}
      <Dialog open={openEditInfo} onOpenChange={setOpenEditInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile Info</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="@username" />
            <Textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About you" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditInfo(false)}>Cancel</Button>
            <Button onClick={() => setOpenEditInfo(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Image Dialog */}
      <Dialog open={openEditImage} onOpenChange={setOpenEditImage}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <input type="file" accept="image/*" className="hidden" id="upload-photo" onChange={handleImageChange} />
            <label htmlFor="upload-photo" className="block bg-muted text-center p-2 rounded-md cursor-pointer hover:bg-muted/80">
              Click to Upload Image
            </label>
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="h-24 w-24 rounded-full border mx-auto" />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditImage(false)}>Cancel</Button>
            <Button onClick={handleSaveImage}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Experience Dialog */}
      <Dialog open={openEditExperience} onOpenChange={setOpenEditExperience}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Experience</DialogTitle>
          </DialogHeader>
          <div className="py-4 max-h-96 overflow-y-auto">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  {experiences.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={() => removeExperience(experience.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
                <Input 
                  value={experience.title} 
                  onChange={(e) => handleExperienceChange(experience.id, 'title', e.target.value)} 
                  placeholder="Title" 
                />
                <Input 
                  value={experience.company} 
                  onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)} 
                  placeholder="Company" 
                />
                <Input 
                  value={experience.date} 
                  onChange={(e) => handleExperienceChange(experience.id, 'date', e.target.value)} 
                  placeholder="Date" 
                />
                <Textarea 
                  value={experience.description} 
                  onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)} 
                  placeholder="Description" 
                  className="min-h-24"
                />
                {index < experiences.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-6 flex items-center justify-center" 
              onClick={addNewExperience}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditExperience(false)}>Cancel</Button>
            <Button onClick={() => setOpenEditExperience(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Social Links Dialog */}
      <Dialog open={openEditSocials} onOpenChange={setOpenEditSocials}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Social Links</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input 
              value={socials.github} 
              onChange={(e) => setSocials({...socials, github: e.target.value})} 
              placeholder="GitHub URL" 
            />
            <Input 
              value={socials.linkedin} 
              onChange={(e) => setSocials({...socials, linkedin: e.target.value})} 
              placeholder="LinkedIn URL" 
            />
            <Input 
              value={socials.twitter} 
              onChange={(e) => setSocials({...socials, twitter: e.target.value})} 
              placeholder="Twitter URL" 
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditSocials(false)}>Cancel</Button>
            <Button onClick={() => setOpenEditSocials(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpertProfile;