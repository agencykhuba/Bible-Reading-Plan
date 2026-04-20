import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages, RefreshCw, Volume2 } from 'lucide-react';

interface HebrewTerm {
  hebrew: string;
  transliteration: string;
  pronunciation: string;
  meaning: string;
  definition: string;
  usage: string;
  reference: string;
}

// Collection of important Hebrew biblical terms
const HEBREW_TERMS: HebrewTerm[] = [
  {
    hebrew: "שָׁלוֹם",
    transliteration: "Shalom",
    pronunciation: "shah-LOME",
    meaning: "Peace, wholeness, completeness",
    definition: "More than just absence of conflict - it means total well-being, harmony, and prosperity.",
    usage: "Used as a greeting and blessing throughout Scripture",
    reference: "Numbers 6:26"
  },
  {
    hebrew: "אָמֵן",
    transliteration: "Amen",
    pronunciation: "ah-MEN",
    meaning: "So be it, truly, verily",
    definition: "An affirmation of truth and agreement, meaning 'it is firm' or 'it is certain'.",
    usage: "Used to conclude prayers and affirm statements of faith",
    reference: "Deuteronomy 27:15"
  },
  {
    hebrew: "חֶסֶד",
    transliteration: "Chesed",
    pronunciation: "KHEH-sed",
    meaning: "Loving-kindness, steadfast love, mercy",
    definition: "God's loyal, covenant love - faithful, enduring kindness beyond what is deserved.",
    usage: "Describes God's character and covenantal faithfulness",
    reference: "Psalm 136:1"
  },
  {
    hebrew: "הַלְלוּיָהּ",
    transliteration: "Hallelujah",
    pronunciation: "hah-leh-loo-YAH",
    meaning: "Praise the Lord",
    definition: "A compound word: 'Hallelu' (praise) + 'Yah' (short form of Yahweh).",
    usage: "A call to worship and praise found throughout the Psalms",
    reference: "Psalm 150:1"
  },
  {
    hebrew: "יְהוָה",
    transliteration: "YHWH (Yahweh)",
    pronunciation: "yah-WEH",
    meaning: "I AM, the self-existent one",
    definition: "The personal name of God, meaning 'I am who I am' - the eternal, self-sufficient one.",
    usage: "The covenant name of God revealed to Moses",
    reference: "Exodus 3:14"
  },
  {
    hebrew: "תּוֹרָה",
    transliteration: "Torah",
    pronunciation: "toh-RAH",
    meaning: "Law, instruction, teaching",
    definition: "God's instruction and guidance for His people, specifically the first five books of Moses.",
    usage: "Refers to both the Law of Moses and God's teachings in general",
    reference: "Psalm 119:1"
  },
  {
    hebrew: "אֱמוּנָה",
    transliteration: "Emunah",
    pronunciation: "eh-moo-NAH",
    meaning: "Faith, faithfulness, steadfastness",
    definition: "Active trust and reliability - not just belief but steadfast loyalty and commitment.",
    usage: "Describes both God's faithfulness and human faith in Him",
    reference: "Habakkuk 2:4"
  },
  {
    hebrew: "רוּחַ",
    transliteration: "Ruach",
    pronunciation: "ROO-akh",
    meaning: "Spirit, wind, breath",
    definition: "Can mean wind, breath, or spirit - often refers to the Spirit of God or human spirit.",
    usage: "Describes the Holy Spirit and the breath of life",
    reference: "Genesis 1:2"
  },
  {
    hebrew: "כָּבוֹד",
    transliteration: "Kavod",
    pronunciation: "kah-VODE",
    meaning: "Glory, honor, weight",
    definition: "God's manifest presence and splendor - His weighty, impressive glory.",
    usage: "Describes God's glorious presence and human honor",
    reference: "Exodus 33:18"
  },
  {
    hebrew: "אַהֲבָה",
    transliteration: "Ahavah",
    pronunciation: "ah-hah-VAH",
    meaning: "Love",
    definition: "Deep affection and committed love - both God's love for us and our love for Him.",
    usage: "Central to the greatest commandment and God's character",
    reference: "Deuteronomy 6:5"
  }
];

export default function HebrewTermOfTheDay() {
  const [term, setTerm] = useState<HebrewTerm | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getTermOfTheDay = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % HEBREW_TERMS.length;
    return HEBREW_TERMS[index];
  };

  const getRandomTerm = () => {
    const randomIndex = Math.floor(Math.random() * HEBREW_TERMS.length);
    return HEBREW_TERMS[randomIndex];
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
    <Card className="overflow-hidden border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-purple-100">
              <Languages className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Hebrew Term of the Day</CardTitle>
              <CardDescription className="text-sm">Biblical Hebrew</CardDescription>
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
        <div className="text-center py-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-4xl md:text-5xl font-bold text-purple-900 mb-2" dir="rtl">
            {term.hebrew}
          </div>
          <div className="text-xl font-semibold text-purple-700">
            {term.transliteration}
          </div>
          <div className="text-sm text-purple-600 mt-1">
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
