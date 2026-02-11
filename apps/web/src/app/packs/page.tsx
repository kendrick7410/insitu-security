import { PackCard } from '@/components/PackCard';
import { packs } from '@/data/packs';

export default function PacksPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="section-title">Nos packs complets</h1>
        <p className="section-subtitle">
          Des solutions clés en main avec jusqu'à -25% de réduction
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {packs.map(pack => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>

      {/* Why Choose Packs */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Pourquoi choisir un pack ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow mb-2">-25%</div>
            <p className="text-gray-700">Économies maximales</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow mb-2">100%</div>
            <p className="text-gray-700">Compatible et testé</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow mb-2">30min</div>
            <p className="text-gray-700">Installation guidée</p>
          </div>
        </div>
      </div>
    </div>
  );
}
