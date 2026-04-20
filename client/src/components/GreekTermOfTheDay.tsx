import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages, RefreshCw, Volume2 } from 'lucide-react';

interface GreekTerm {
  greek: string;
  transliteration: string;
  pronunciation: string;
  meaning: string;
  definition: string;
  usage: string;
  reference: string;
}

// Collection of important Greek biblical terms
const GREEK_TERMS: GreekTerm[] = [
  {
    greek: "ἀγάπη",
    transliteration: "Agape",
    pronunciation: "ah-GAH-pay",
    meaning: "Unconditional love",
    definition: "The highest form of love - selfless, sacrificial, unconditional love that seeks the best for others.",
    usage: "God's love for humanity and the love Christians are called to show",
    reference: "1 Corinthians 13:4-8"
  },
  {
    greek: "χάρις",
    transliteration: "Charis",
    pronunciation: "KHAH-rees",
    meaning: "Grace, favor, kindness",
    definition: "Unmerited favor and divine blessing - God's kindness given freely, not earned.",
    usage: "Central to salvation and God's relationship with believers",
    reference: "Ephesians 2:8"
  },
  {
    greek: "πίστις",
    transliteration: "Pistis",
    pronunciation: "PIS-tis",
    meaning: "Faith, trust, belief",
    definition: "Active trust and confidence in God - not just mental assent but committed belief.",
    usage: "Essential for salvation and Christian life",
    reference: "Hebrews 11:1"
  },
  {
    greek: "ἐκκλησία",
    transliteration: "Ekklesia",
    pronunciation: "ek-klay-SEE-ah",
    meaning: "Church, assembly, called-out ones",
    definition: "The gathered community of believers - those called out from the world to belong to God.",
    usage: "Refers to both local congregations and the universal body of Christ",
    reference: "Matthew 16:18"
  },
  {
    greek: "εὐαγγέλιον",
    transliteration: "Euangelion",
    pronunciation: "yoo-an-GEL-ee-on",
    meaning: "Gospel, good news",
    definition: "The good news of Jesus Christ - His life, death, and resurrection for salvation.",
    usage: "The message of salvation proclaimed by Christians",
    reference: "Mark 1:1"
  },
  {
    greek: "δόξα",
    transliteration: "Doxa",
    pronunciation: "DOX-ah",
    meaning: "Glory, splendor, praise",
    definition: "Divine radiance and honor - God's magnificent presence and the praise due to Him.",
    usage: "Describes God's glory and the honor given to Him",
    reference: "Luke 2:14"
  },
  {
    greek: "ἁμαρτία",
    transliteration: "Hamartia",
    pronunciation: "hah-mar-TEE-ah",
    meaning: "Sin, missing the mark",
    definition: "Falling short of God's standard - literally 'missing the mark' like an archer missing the target.",
    usage: "Describes human rebellion and failure to meet God's standards",
    reference: "Romans 3:23"
  },
  {
    greek: "σωτηρία",
    transliteration: "Soteria",
    pronunciation: "so-tay-REE-ah",
    meaning: "Salvation, deliverance, rescue",
    definition: "Divine rescue from sin and its consequences - complete deliverance and restoration.",
    usage: "The saving work of Christ and the believer's deliverance",
    reference: "Acts 4:12"
  },
  {
    greek: "πνεῦμα",
    transliteration: "Pneuma",
    pronunciation: "PNYOO-mah",
    meaning: "Spirit, wind, breath",
    definition: "Can mean wind, breath, or spirit - often refers to the Holy Spirit or human spirit.",
    usage: "Describes the Holy Spirit and spiritual realities",
    reference: "John 3:8"
  },
  {
    greek: "μετάνοια",
    transliteration: "Metanoia",
    pronunciation: "met-AH-noy-ah",
    meaning: "Repentance, change of mind",
    definition: "A complete change of mind and heart - turning away from sin and toward God.",
    usage: "Essential response to the gospel and ongoing Christian life",
    reference: "Acts 2:38"
  },
  {
    greek: "κοινωνία",
    transliteration: "Koinonia",
    pronunciation: "koy-no-NEE-ah",
    meaning: "Fellowship, communion, sharing",
    definition: "Deep spiritual fellowship and partnership - shared life and mutual participation.",
    usage: "The intimate community believers share with God and each other",
    reference: "Acts 2:42"
  },
  {
    greek: "ἀλήθεια",
    transliteration: "Aletheia",
    pronunciation: "ah-LAY-thay-ah",
    meaning: "Truth, reality",
    definition: "Ultimate reality and truth - what is real and reliable, as opposed to falsehood.",
    usage: "Describes God's truth and the truth of the gospel",
    reference: "John 14:6"
  }
];

export default function GreekTermOfTheDay() {
  const [term, setTerm] = useState<GreekTerm | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getTermOfTheDay = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = (dayOfYear + 5) % GREEK_TERMS.length; // Offset from Hebrew term
    return GREEK_TERMS[index];
  };

  const getRandomTerm = () => {
    const randomIndex = Math.floor(Math.random() * GREEK_TERMS.length);
    return GREEK_TERMS[randomIndex];
  };

  useEffect(() => {
    setTerm(getTermOfTheDay());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTerm(getRandomTerm());
      setIsRefreshing(false);
    }, 500);
  };

  const handlePronounce = () => {
    if (term && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(term.transliteration);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!term) return null;

  return (
    <Card className="overflow-hidden border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-emerald-100">
              <Languages className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Greek Term of the Day</CardTitle>
              <CardDescription className="text-sm">Biblical Greek (Koine)</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePronounce}
              className="h-8 w-8 p-0"
              title="Listen to pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="text-4xl md:text-5xl font-bold text-emerald-900 mb-2">
            {term.greek}
          </div>
          <div className="text-xl font-semibold text-emerald-700">
            {term.transliteration}
          </div>
          <div className="text-sm text-emerald-600 mt-1">
            ({term.pronunciation})
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-slate-700 text-sm mb-1">Meaning:</h4>
            <p className="text-slate-600">{term.meaning}</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 text-sm mb-1">Definition:</h4>
            <p className="text-slate-600">{term.definition}</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 text-sm mb-1">Biblical Usage:</h4>
            <p className="text-slate-600">{term.usage}</p>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm text-slate-500">
              <span className="font-medium">Reference:</span> {term.reference}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
